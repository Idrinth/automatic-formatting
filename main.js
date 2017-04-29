var nodegit = require ( "nodegit" );
function sleep(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}
var creds = nodegit.Cred.userpassPlaintextNew ( "idrinth", "" );
var credO = {
                                callbacks: {
                                    credentials: function () {
                                        return creds;
                                    }
                                }
                            };
project = "Idrinth/automatic-formatting";
branch = "test";
var handler = function ( repo ) {
                while ( !require ( 'fs' ).existsSync ( "repository/" + project + "/" + branch + '/LICENSE' ) ) {
                    sleep ( 1 );
                }
            var Ref;
                var files = require ( "./src/recursive-format" ) ( "repository/" + project + "/" + branch );
                console.log(files);
                    var bot = nodegit.Signature.now ( "Björn Büttner", "Idrinth@users.noreply.github.com" );
                    repo.createCommitOnHead (
                        files,
                        bot,
                        bot, 
                        "prettyfiing branch"
                    ).then ( function ( oid) {
                    return repo.getRemote ( "origin");
                })
                .then(function(remote){
    Ref = remote;
                    return repo.getBranch(branch);
                })
                .then ( function ( branch ) {
    console.log(branch.toString());
                    return Ref.push (
                            [ branch.toString ()+':'+ branch.toString () ],
                            credO
                    );
                } );
            };
if(require("fs").existsSync("repository/" + project + "/" + branch)) {
    nodegit.Repository.open ( "repository/" + project + "/" + branch )
        .then ( function(repo){
            repo.fetch("origin");
            return repo;
        } )
        .then(function (repo) {
            repo.mergeBranches(branch, "origin/"+branch);
            return repo;
        })
        .then(handler)
        .catch ( console.log );
} else {
    nodegit.Clone ( "https://github.com/" + project, "repository/" + project + "/" + branch, {
            checkoutBranch: branch,
            credO
        } )
        .then(function(repo){
            nodegit.Remote.create ( repo, "origin", "git@github.com:" + project + ".git" );
            return repo;
        })
        .then ( handler )
        .catch ( console.log);
}