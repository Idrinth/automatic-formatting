var https = require("https");
var debug = require("./if-debug");
var config = require("./app-config");
var request = function(repo, commit, status) {
  var data = JSON.stringify({
    state: status,
    target_url: "https://github.com/idrinth/automatic-formatting",
    description: config.messages[status],
    context: "idrinth/automatic-formatting"
  });
  var request = https.request({
    hostname: "api.github.com",
    path: "/repos/" + repo + "/statuses/" + commit,
    method: "POST",
    auth: config.user.login + ":" + config.user.password,
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
    request(repo, commit, "pending");
  },
  success: function(repo, commit) {
    request(repo, commit, "success");
  },
  failure: function(repo, commit) {
    request(repo, commit,  "failure" );
  }
};
