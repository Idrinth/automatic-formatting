const app = require("express")();
(function(){
    var nodegit = require("nodegit");
    const setup = JSON.parse(require("fs").readFileSync("config.json").toString());
    const secrets = setup.secrets;
    const creds = nodegit.Cred.userpassPlaintextNew(setup.user.login,setup.user.password);
    const bot = nodegit.Signature.now(setup.user.name,setup.user.email);
    require("./src/setup")(app,setup.port,require("./src/taskmaster"));
}());