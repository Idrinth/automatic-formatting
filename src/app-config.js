var nodegit = require("nodegit");
var fs = require("fs-extra");
var merge = require("merge").recursive;
const setup = merge(
  {
    user: {
      login: "",
      password: "",
      name: "",
      email: ""
    },
    port: 33000,
    secrets: {},
    prettier: {
      useTabs: false,
      printWidth: 80,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: "none",
      bracketSpacing: true,
      jsxBracketSameLine: false,
      parser: "babylon",
      semi: true
    },
    debug: false,
    file: {
      "\\.min\\.js$": false,
      "\\.js$": true
    },
    directory: {
      "\\.git": false
    }
  },
  JSON.parse(fs.readFileSync("config.json").toString())
);
module.exports = setup;
module.exports.creds = nodegit.Cred.userpassPlaintextNew(
  setup.user.login,
  setup.user.password
);
