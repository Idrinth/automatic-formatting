module.exports = function(base) {
    var debug = require("./if-debug");
    this = require("./app-config");
    var fs = require("fs-extra");
    var cFile = (base + "/" + ".idrinth.automatic-formatting.json").replace(
      "//",
      "/"
    );
    if(fs.existsSync(cFile)) {
        var merge = require("js-object-merge");
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