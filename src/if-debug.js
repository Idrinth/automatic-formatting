module.exports =
  function(output                  ) {
  if (require("./app-config").debug) {
  console.log(output);
  }
};
