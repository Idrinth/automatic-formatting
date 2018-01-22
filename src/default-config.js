module.exports = {
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
  },
  frequency: 5000,
  messages: {
    pending: "Checking your code in just a minute.",
    failure: "Code doesn't seem to be formatted correctly, working on it.",
    success: "No changes due to formatting required, you're good."
  }
};
