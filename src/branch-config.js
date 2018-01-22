var config = require("./app-config");
var debug = require("./if-debug");
var fs = require("fs-extra");
var merge = require("merge").recursive;
module.exports = function(base) {
  var cFile = (base + "/.idrinth.automatic-formatting.json").replace("//", "/");
  if (!fs.existsSync(cFile)) {
    debug("project " + base + " has no own configuration");
    return config;
  }
    var content = fs.readFileSync(cFile).toString();
    debug("project " + base + " has own configuration: " + content);
    var data = JSON.parse(content);
    for (var key in data) {
      if (key !== "format" && key !== "file" && key !== "directory") {
        delete data[key];
      }
    }
  return merge(config, data);
};
