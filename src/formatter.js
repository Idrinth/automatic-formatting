var fs = require("fs-extra");
var sleep = require("thread-sleep");
var prettier = require("prettier");
module.exports = function(config) {
  this.config = config.prettier;
  this.prettier = prettier;
  this.format = function(file) {
    var content = fs.readFileSync(file).toString();
    if (this.prettier.check(content)) {
      return false;
    }
    content = this.prettier.format(content);
    fs.writeFileSync(file, content);
    while (!this.prettier.check(fs.readFileSync(file).toString())) {
      sleep(1000);
    }
    return true;
  };
  return this;
};
