var taskmaster = require("./taskmaster");
var config = require("./app-config");
var fs = require("fs-extra");
var parser = require("body-parser");
module.exports = function(app) {
  app.use(parser.raw({ type: "*/*" }));
  app.get("/", (request, response) => {
    fs.readFile("home.html", function(err, data) {
      if (err) {
        throw err;
      }
      response.send(data.toString());
    });
  });
  var redirect = function(request, response) {
    response.append("Location", "/");
    response.status(303);
    response.send("Not here...");
  };
  app.get("/*", redirect);
  app.post("/:user/:repository", (request, response) => {
    var repo = request.params.user + "/" + request.params.repository;
    taskmaster.add(
      repo,
      request.get("X-GitHub-Event"),
      request.get("X-Hub-Signature"),
      request.body
    );
    response.send(JSON.stringify(true));
  });
  app.post("/|/[^/]+|/[^/]+/[^/]+/.+", redirect);

  app.listen(config.port, err => {
    if (err) {
      return console.log("something bad happened", err);
    }
    taskmaster.run();
  });
  taskmaster.start();
};
