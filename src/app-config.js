var nodegit = require("nodegit");
const setup = JSON.parse(
  require("fs-extra").readFileSync("config.json").toString()
);
module.exports = setup;
module.exports.creds = nodegit.Cred.userpassPlaintextNew(
  setup.user.login,
  setup.user.password
);
module.exports.bot = nodegit.Signature.now(setup.user.name, setup.user.email);
