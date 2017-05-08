fs = require("fs-extra");
module.exports = function(base) {
  var getFormat = function(base) {
    var cFile = (base + "/" + ".idrinth.automatic-formatting.json").replace(
      "//",
      "/"
    );
    var format = require("./app-config").prettier;
    if (!require("fs-extra").existsSync(cFile)) {
      return format;
    }
    return require("js-object-merge")(
      format,
      JSON.parse(fs.readFileSync(cFile).toString())
    );
  };
    this.config = getFormat(base);
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
};