var config = require("./app-config");
module.exports = function(output) {
  if (config.debug) {
    console.log(output);
  }
};
