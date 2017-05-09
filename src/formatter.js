fs = require("fs-extra");
module.exports = function(config) {
    this.config = config.prettier;
    this.prettier = require("prettier");
    this.format = function(file) {
        var sleep = function (time) {
            var stop = new Date().getTime();
            while (new Date().getTime() < stop + time) {
            }
          };
        var content = fs.readFileSync(file).toString();
        if (!this.prettier.check(content)) {
          content = this.prettier.format(content);
          fs.writeFileSync(file, content);
          while (!this.prettier.check(fs.readFileSync(file).toString())) {
            sleep(2);
          }
      }
        return prettier.format(content,this.config);
    };
    return this;
};