var fs = require("fs-extra");
var sleep = require("thread-sleep");
module.exports = function(config) {
    this.config = config.prettier;
    this.prettier = require("prettier");
    this.format = function(file) {
        var content = fs.readFileSync(file).toString();
        if (!this.prettier.check(content)) {
          content = this.prettier.format(content);
          fs.writeFileSync(file, content);
          while (!this.prettier.check(fs.readFileSync(file).toString())) {
                sleep(1000);
          }
      }
        return prettier.format(content,this.config);
    };
    return this;
};