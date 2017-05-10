var https = require("https");
var debug = require("./if-debug");
var user = require("./app-config").user;
var request = function(repo, commit, message, status) {
  var data = JSON.stringify({
    state: status,
    target_url: "https://github.com/idrinth/automatic-formatting",
    description: message,
    context: "idrinth/automatic-formatting"
  });
  var request = https.request({
    hostname: "api.github.com",
    path: "/repos/" + repo + "/statuses/" + commit,
    method: "POST",
    auth: user.login + ":" + user.password,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Idrinth/automatic-formatting"
    },
    agent: false
  });
  debug("to GH:" + data);
  request.write(data);
  request.end();
};
module.exports = {
  pending: function(repo, commit) {
    request(repo, commit, "Checking your code in just a minute.", "pending");
  },
  success: function(repo, commit) {
    request(
      repo,
      commit,
      "No changes due to formatting required, you're good.",
      "success"
    );
  },
  failure: function(repo, commit) {
    request(
      repo,
      commit,
      "Code doesn't seem to be formatted correctly, working on it.",
      "failure"
    );
  }
};
