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
            console.log("12");
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
            console.log("23");
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
            console.log("35");
    console.log("oid "+oid);
                    return repo.getRemote ( "origin");
                })
                .then(function(remote){
            console.log("39");
    Ref = remote;
                    return repo.getBranch(branch);
                })
                .then ( function ( remote ) {
            console.log("43");
                    return remote.push (
                            [ Ref.toString () ],
                            credO
                    );
                } )
                        .then(function(a) {
                            console.log(a);
                        });
            };
if(require("fs").existsSync("repository/" + project + "/" + branch)) {
    nodegit.Repository.open ( "repository/" + project + "/" + branch )
        .then ( function(repo){
            console.log("68");
            repo.fetch("origin");
            return repo;
        } )
        .then(function (repo) {
            console.log("73");
            repo.mergeBranches(branch, "origin/"+branch);
            return repo;
        })
        .then(handler)
        .catch ( console.log )
        .done("pulled and formatted");
} else {
    nodegit.Clone ( "https://github.com/" + project, "repository/" + project + "/" + branch, {
            checkoutBranch: branch,
            credO
        } )
        .then(function(repo){
            console.log("86");
            nodegit.Remote.create ( repo, "origin", "git@github.com:" + project + ".git" );
            return repo;
        })
        .then ( handler )
        .catch ( console.log )
        .done(function(){console.log("cloned new and formatted");});
}