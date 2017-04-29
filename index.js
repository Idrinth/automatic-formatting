const app = require("express")();
const port = 33000;
const secrets = {
  "IDotD/Userscript": ""
};
taskmaster = require("./src/taskmaster");

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
  response.send(JSON.stringify(taskmaster.tasks));
});
app.post("/|/[^/]+|/[^/]+/[^/]+/.+", (request, response) => {
  response.append("Location", "/");
  response.status(303);
  response.send("Not here...");
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  taskmaster.run();
  console.log(`server is listening on ${port}`);
});
