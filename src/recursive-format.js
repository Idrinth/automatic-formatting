var fs = require("fs-extra");
var debug = require("./if-debug");
function format(dir, base,formatter,config) {
  var may = function(file, base, type, def) {
    var data = config[type];
    var cur = file.replace(
      new RegExp("^" + base.replace(/\//, "\/") + "\/"),
      ""
    );
    for (var path in data) {
      if (cur.match(new RegExp(path))) {
        return data[path];
      }
    }
    return def;
  };
  if (!may(dir, base, "directory", true)) {
    return [];
  }
  debug("formatting:" + dir + " of " + base);
  var files = fs.readdirSync(dir);
  var modified = [];
  for (var pos = files.length - 1; pos >= 0; pos--) {
    var file = dir + "/" + files[pos];
    if (fs.statSync(file).isDirectory()) {
      modified = modified.concat(fm(file, base,formatter,config));
    } else if (may(file, base, "file", false) && formatter.format(file)) {
        modified.push(
          file.replace(new RegExp("^" + base.replace(/\//, "\/") + "\/"), "")
        );
    }
  }
  debug("formatted:" + modified.join());
  return modified;
}
module.exports = function(dir) {
    while (
      !(fs.existsSync(dir) &&
      fs.readdirSync(dir).length>0)
    ) {
      sleep(1000);
    }
    var config = new require('./branch-config')(dir);
    format(dir, dir, new require("./formatter")(config), config);
};
