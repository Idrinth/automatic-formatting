fs = require("fs-extra");
prettier = require("prettier");
format = require("./app-config").prettier;
function sleep(time) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {
  }
}
fm = function(dir, base) {
  may = function(file, base, type, def) {
      var data = require("./app-config")[type];
      var cur = file.replace(new RegExp("^" + base.replace(/\//, "\/") + "\/"), "");
      for(var path in data) {
          if(cur.match(new RegExp(path))) {
              return data[path];
          }
      }
      return def;
  };
  if(!may(dir,base,'directory',true)) {
      return [];
  }
  base = base ? base : dir;
  require("./if-debug")("formatting:" + dir + " of " + base);
  var files = fs.readdirSync(dir);
  var modified = [];
  for (var pos = files.length - 1; pos >= 0; pos--) {
    var file = dir + "/" + files[pos];
    if (fs.statSync(file).isDirectory()) {
      modified = modified.concat(fm(file, base));
    } else if (mayFile(file,base,'file',false)) {
      var content = fs.readFileSync(file).toString();
      if (!prettier.check(content, format)) {
        content = prettier.format(content, format);
        fs.writeFileSync(file, content);
        while (!prettier.check(fs.readFileSync(file).toString())) {
          sleep(2);
        }
        modified.push(
          file.replace(new RegExp("^" + base.replace(/\//, "\/") + "\/"), "")
        );
      }
    }
  }
  sleep(1);
  require("./if-debug")("formatted:" + modified.join());
  return modified;
};
module.exports = fm;
