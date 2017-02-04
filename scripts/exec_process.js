var exec = require('child_process').exec;

var result = function(command, callback) {
    var child = exec(command, function(err, stdout, stderr) {
        if(err != null){
            return callback(new Error(err), null);
        } else if(typeof(stderr) != "string"){
            return callback(new Error(stderr), null);
        } else {
            return callback(null, stdout);
        }
    });
}

exports.result = result;
