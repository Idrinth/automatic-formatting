var nodegit = require("nodegit");
var fs = require("fs-extra");
var merge = require("merge").recursive;
var defaults = require("./default-config");
if(!fs.existsSync()) {
    fs.writeFileSync('config.json',JSON.stringify(defaults));
}
const setup = merge(
  defaults,
  JSON.parse(fs.readFileSync("config.json").toString())
);
module.exports = setup;
module.exports.creds = nodegit.Cred.userpassPlaintextNew(
  setup.user.login,
  setup.user.password
);
