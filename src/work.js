var nodegit = require("nodegit");
var gitstatus = require("./gitstatus");
var config = require("./app-config");
var format = require("./recursive-format");
var fs = require("fs-extra");
var debug = require("./if-debug");
module.exports = function(project, branch, commit) {
  var credO = {
    callbacks: {
      credentials: function() {
        return config.creds;
      }
    }
  };
  var handler = function(repo) {
    var Ref;
    var files = format(
      "repository/" + project + "/" + branch
    );
    debug(
      "formatted:" + files.join() + " in " + project + "/" + branch
    );
    if (files.length > 0) {
      gitstatus.failure(project, commit);
    } else {
      gitstatus.success(project, commit);
      return;
    }
    var bot = nodegit.Signature.now(config.user.name, config.user.email);
    repo
      .createCommitOnHead(
        files,
        bot,
        bot,
        "prettyfiing branch"
      )
      .then(function(oid) {
        return repo.getRemote("origin");
      })
      .then(function(remote) {
        Ref = remote;
        return repo.getBranch(branch);
      })
      .then(function(branch) {
        return Ref.push([branch.toString() + ":" + branch.toString()], credO);
      });
  };
  function onError(exception) {
    gitstatus.failure(project, commit);
    console.log(exception);
  }
  if (fs.existsSync("repository/" + project + "/" + branch)) {
    nodegit.Repository
      .open("repository/" + project + "/" + branch)
      .then(function(repo) {
        repo.fetch("origin");
        return repo;
      })
      .then(function(repo) {
        repo.mergeBranches(branch, "origin/" + branch);
        return repo;
      })
      .then(handler)
      .catch(onError);
  } else {
    nodegit
      .Clone(
        "https://github.com/" + project,
        "repository/" + project + "/" + branch,
        {
          checkoutBranch: branch,
          credO
        }
      )
      .then(function(repo) {
        nodegit.Remote.create(
          repo,
          "origin",
          "git@github.com:" + project + ".git"
        );
        return repo;
      })
      .then(handler)
      .catch(onError);
  }
};
