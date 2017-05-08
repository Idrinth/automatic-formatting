var nodegit = require("nodegit");
const setup = require("js-object-merge")( {
    "user": {
        "login": "",
        "password": "",
        "name": "",
        "email": ""
    },
    "port": 33000,
    "secrets": {},
    "prettier":{
        "useTabs": false,
        "printWidth": 80,
        "tabWidth": 2,
        "singleQuote": true,
        "trailingComma": "none",
        "bracketSpacing": true,
        "jsxBracketSameLine": false,
        "parser": "babylon",
        "semi": true
    },
    "debug": false,
    "file": {
        "\\.min\\.js$": false,
        "\\.js$": true
    },
    "directory": {
        "\\.git": false
    }
},JSON.parse(
  require("fs-extra").readFileSync("config.json").toString()
));
module.exports = setup;
module.exports.creds = nodegit.Cred.userpassPlaintextNew(
  setup.user.login,
  setup.user.password
);
module.exports.bot = nodegit.Signature.now(setup.user.name, setup.user.email);
