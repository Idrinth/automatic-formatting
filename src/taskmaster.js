var secrets = require('./app-config').secrets;
var taskmaster = {
    tasks:{},
    inPr:{},
    toAdd:[],
    active:false,
    add: function(repo,event,signature,body) {
        function signBlob (key, blob) {
          return 'sha1=' + require('crypto').createHmac('sha1', key).update(blob).digest('hex');
        }
        if(!secrets || !secrets[repo]) {
            return;
        }
        if(event!=='pull_request'&&event!=='push') {
            return;
        }
        if (!require('buffer-equal-constant-time')(new Buffer(signature), new Buffer(signBlob(secrets[repo], body)))) {
            return;
        }
        taskmaster.toAdd.push([event,body]);
    },
    run: function() {
        var getNewPushes = function() {
            var toAdd = taskmaster.toAdd;
            var pushes = [];
            taskmaster.toAdd=[];
            for(var c=0;c<toAdd.length;c++) {
                try{
                    var data = toAdd[c][1];
                    if(toAdd[c][0]==='pull_request') {
                        if(data.action === "opened" || data.action==="reopened") {
                            taskmaster.inPr[data.repository.full_name]=taskmaster.inPr[data.repository.full_name]?taskmaster.inPr[data.repository.full_name]:{};
                            taskmaster.inPr[data.repository.full_name][data.pull_request.head.ref]=true;
                        } else if(data.action === "closed") {
                            delete taskmaster.inPr[data.repository.full_name][data.pull_request.head.ref];
                        }
                    } else {
                        pushes.push(data);
                    }
                } catch(e) {
                    delete toAdd[c];
                }
            }
            return pushes;
        };
        var pushes = getNewPushes();
        for(var c = 0;c<pushes.length;c++) {
            var data = pushes[c];
            if(taskmaster.inPr[data.repository.full_name][data.pull_request.head.ref]) {
                taskmaster.tasks[data.repository.full_name+'|'+data.pull_request.head.ref]=data.head;
                require("./gitstatus").pending(data.repository.full_name,data.pull_request.head.ref,data.head);
            }
        }
        var run = function() {
            for(var id in taskmaster.tasks) {
                if(!taskmaster.inPr[id.split('|')[0]]||!taskmaster.inPr[id.split('|')[0]][id.split('|')[1]]) {
                    delete taskmaster.tasks[id];
                } else {
                    var commit = taskmaster.tasks[id];
                    delete taskmaster.tasks[id];
                    taskmaster.active=true;
                    try{
                        require('./work')(id.split('|')[0],id.split('|')[1],commit);
                        return;
                    } catch(e) {
                        console.log(e);
                        taskmaster.active=false;
                    }
                }
            }
        };
        if(!taskmaster.active){
            run();
        }
        require('timers').setTimeout(taskmaster.run,2500);
    }
};
module.exports = taskmaster;