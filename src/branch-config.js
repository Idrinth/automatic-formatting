var config = require("./app-config");
var debug = require("./if-debug");
var fs = require("fs-extra");
var merge = require("js-object-merge");
module.exports = function(base) {
    this = config;
    var cFile = (base + "/" + ".idrinth.automatic-formatting.json").replace(
      "//",
      "/"
    );
    if(fs.existsSync(cFile)) {
        var content = fs.readFileSync(cFile).toString();
        debug("project "+base+" has own configuration: " + content);
        data = JSON.parse(content);
        if(data) {
            this.format = merge(
              this.format,
              data.format?data.format:{}
            );
            this.file = merge(
              this.file,
              data.file?data.file:{}
            );
            this.directory = merge(
              this.directory,
              data.directory?data.directory:{}
            );
        }
    } else {
        debug("project "+base+" has no own configuration");
    }
    return this;
};