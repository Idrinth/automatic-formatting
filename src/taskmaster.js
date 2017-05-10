var secrets = require("./app-config").secrets;
var fs = require("fs-extra");
var crypto = require("crypto");
var bufferEq = require("buffer-equal-constant-time");
var debug = require("./if-debug");
var work = require("./work");
var timers = require("timers");
var gitstatus = require("./gitstatus");
var taskmaster = {
  tasks: {},
  inPr: {},
  active: {},
  toAdd: [],
  add: function(repo, event, signature, body) {
    function signBlob(key, blob) {
      return (
        "sha1=" + crypto.createHmac("sha1", key).update(blob).digest("hex")
      );
    }
    if (!secrets || !secrets[repo]) {
      return;
    }
    if (event === "delete") {
      return taskmaster.remove(body);
    }
    if (event !== "pull_request" && event !== "push") {
      return;
    }
    if (
      !bufferEq(
        new Buffer(signature),
        new Buffer(signBlob(secrets[repo], body))
      )
    ) {
      return;
    }
    taskmaster.toAdd.push([event, body]);
  },
  remove: function(body) {
    try {
      var data = JSON.parse(body);
      if (data.ref_type !== "branch") {
        return;
      }
      taskmaster.tasks[data.repository.full_name + "|" + data.ref] = "delete";
    } catch (exception) {
      console.log(exception);
    }
  },
  run: function() {
    var getNewPushes = function() {
      var toAdd = taskmaster.toAdd;
      var pushes = [];
      taskmaster.toAdd = [];
      for (var c = 0; c < toAdd.length; c++) {
        try {
          var data = JSON.parse(toAdd[c][1]);
          if (toAdd[c][0] === "pull_request") {
            var name = data.repository.full_name;
            if (data.action !== "closed") {
              debug("pulling:" + name + "," + data.pull_request.head.ref);
              taskmaster.inPr[name] = taskmaster.inPr[name]
                ? taskmaster.inPr[name]
                : {};
              taskmaster.inPr[name][data.pull_request.head.ref] = true;
            } else {
              debug("not pulling:" + name + "," + data.pull_request.head.ref);
              delete taskmaster.inPr[name][data.pull_request.head.ref];
            }
          } else {
            pushes.push(data);
          }
        } catch (e) {
          delete toAdd[c];
        }
      }
      return pushes;
    };
    var pushes = getNewPushes();
    for (var c = 0; c < pushes.length; c++) {
      var data = pushes[c];
      var name = data.repository.full_name;
      var branch = data.ref.split("/")[2];
      if (branch !== "master" && data.head_commit && data.head_commit.id) {
        taskmaster.tasks[name + "|" + branch] = data.head_commit.id;
        gitstatus.pending(name, data.head_commit.id);
      }
    }
    var run = function() {
        var execute = function(id) {
          taskmaster.active[id] = true;
          var commit = taskmaster.tasks[id];
          delete taskmaster.tasks[id];
          try {
            if(commit==='delete') {
            var path = id.split("|")[0] + "/" + id.split("|")[1];
                debug(
                  "removing repository/" + path
                );
                fs
                  .remove("repository/" + path)
                  .then(function() {
                    taskmaster.active[id] = false;
                    debug(
                      "Removed repository/" + path
                    );
                  })
                  .catch(debug);
            } else {
                debug("formatting:" + id);
                work(id.split("|")[0], id.split("|")[1], commit, taskmaster);
            }
            return;
          } catch (e) {
            console.log(e);
          }
        };
      for (var id in taskmaster.tasks) {
        if (
          taskmaster.inPr[id.split("|")[0]] &&
          taskmaster.inPr[id.split("|")[0]][id.split("|")[1]] &&
          !taskmaster.active[id]
        ) {
            return execute(id);
        }
      }
    };
    run();
    timers.setTimeout(taskmaster.run, 5000);
  }
};
module.exports = taskmaster;
