var config = require("./app-config");
var debug = require("./if-debug");
var fs = require("fs-extra");
var merge = require("js-object-merge");
module.exports = function(base) {
    var cFile = (base + "/.idrinth.automatic-formatting.json").replace(
      "//",
      "/"
    );
    var data;
    if(fs.existsSync(cFile)) {
        var content = fs.readFileSync(cFile).toString();
        debug("project "+base+" has own configuration: " + content);
        data = JSON.parse(content);
        for(var key in data) {
            if(key !== 'format' && key !== 'file' && key !== 'directory') {
                delete data[key];
            }
        }
    } else {
        data = {};
        debug("project "+base+" has no own configuration");
    }
    return merge(config,data);
};