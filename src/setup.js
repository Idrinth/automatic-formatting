module.exports = function(app) {
  var taskmaster = require("./taskmaster");
  app.use(require("body-parser").raw({ type: "*/*" }));
  app.get("/", (request, response) => {
    require("fs-extra").readFile("home.html", function(err, data) {
      if (err) {
        throw err;
      }
      response.send(data.toString());
    });
  });
  var redirect = function(request, response){
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

  app.listen(require("./app-config").port, err => {
    if (err) {
      return console.log("something bad happened", err);
    }
    taskmaster.run();
  });
};
