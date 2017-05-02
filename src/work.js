var nodegit = require("nodegit");
var gitstatus = require("./gitstatus");
module.exports = function(project,branch,commit,taskmaster) {
function sleep(time) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {
  }
}
var credO = {
  callbacks: {
    credentials: function() {
      return require("./app-config").creds;
    }
  }
};
var handler = function(repo) {
  while (
    !require("fs").existsSync(
      "repository/" + project + "/" + branch + "/LICENSE"
    )
  ) {
    sleep(1);
  }
  var Ref;
  var files = require("./recursive-format")(
    "repository/" + project + "/" + branch
  );
  require("./if-debug")("formatted:"+files.join()+" in "+repo+"/"+branch);
  if(files.length>0) {
      gitstatus.failure (project,commit);
  } else {
      gitstatus.success (project,commit);
      taskmaster.active = false;
      return;
  }
  repo
    .createCommitOnHead(files, require("./app-config").bot, require("./app-config").bot, "prettyfiing branch")
    .then(function(oid) {
      return repo.getRemote("origin");
    })
    .then(function(remote) {
      Ref = remote;
      return repo.getBranch(branch);
    })
    .then(function(branch) {
      taskmaster.active = false;
      return Ref.push([branch.toString() + ":" + branch.toString()], credO);
    });
};
function onError(exception) {
    taskmaster.active = false;
    require("./gitstatus").failure(project, commit);
    console.log(exception);
}
if (require("fs").existsSync("repository/" + project + "/" + branch)) {
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