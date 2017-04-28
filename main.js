var nodegit = require ( "nodegit" );

project = "IDotD/Userscript";
branch = "idrinth";

require ( "fs-extra" ).remove ( "repository/" + project + "/" + branch, function () {
    nodegit.Clone ( "https://github.com/" + project, "repository/" + project + "/" + branch, {
        checkoutBranch: branch,
        callbacks: {
            credentials: function () {
                return nodegit.Cred.userpassPlaintextNew ( "idrinth", "" );
            }
        }
    } )
            .then ( function ( repo ) {
                console.log ( "repository/" + project + "/" + branch + '/LICENSE' );
                while ( !require ( 'fs' ).existsSync ( "repository/" + project + "/" + branch + '/LICENSE' ) ) {
                    sleep ( 1 );
                }
                require ( "./src/recursive-format" ) ( "repository/" + project + "/" + branch );
                repo.getTree ( "HEAD" ).then ( function ( tree ) {
                    repo.getHeadCommit ().then ( function ( commit ) {
                        var bot = nodegit.Signature.now ( "Björn Büttner", "Idrinth@users.noreply.github.com" );
                        nodegit.Commit.create ( repo, "HEAD", bot, bot, "UTF-8", "prettyfiing branch", tree, 1, [ commit ] ).then ( function ( oid ) {
                            return nodegit.Remote.create ( repo, "origin",
                                    "git@github.com:" + project + ".git" )
                                    .then ( function ( remote ) {
                                        return remote.push (
                                                [ "refs/heads/" + branch + ":refs/heads/" + branch ],
                                                {
                                                    callbacks: {
                                                        credentials: function () {
                                                            return nodegit.Cred.userpassPlaintextNew ( "idrinth", "" );
                                                        }
                                                    }
                                                }
                                        );
                                    } );
                        } ).done ( function () {
                            console.log ( "Done!" );
                        } );
                    } );
                } );
            } )
            .catch ( console.log );
} ).done ( function ( e ) {
    console.log ( e );
    console.log ( 'done' );
} );