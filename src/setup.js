module.exports = function(app) {
    taskmaster = require("./taskmaster");
app.use (require('body-parser').raw({type:"*/*"}));
app.get("/", (request, response) => {
  require("fs").readFile("home.html", function(err, data) {
    if (err) {
      throw err;
    }
    response.send(data.toString());
  });
});
app.get("/*", (request, response) => {
  response.append("Location", "/");
  response.status(303);
  response.send("Not here...");
});
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
app.post("/|/[^/]+|/[^/]+/[^/]+/.+", (request, response) => {
  response.append("Location", "/");
  response.status(303);
  response.send("Not here...");
});

app.listen(require("./app-config").port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  taskmaster.run();
});

};