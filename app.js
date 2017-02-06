#!/usr/bin/env nodejs
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var branch_verifier = require('./middlewares/branch.js');
var secure_payload = require('./middlewares/secure_payload.js');
var constants = require('./constants/constants.js');
var jsonParser = bodyParser.json();


app.post('/deploy', jsonParser, 
    branch_verifier(constants.branch),
    secure_payload(constants.secret), 
    function(req, res) {
        var logger = require('./scripts/logger.js');
        var exec_process = require('./scripts/exec_process.js');

        exec_process.result("sh shell_scripts/deploy.sh", function(err, response) {
            if(!err) {
                logger.info(response);

                res.send('git deploy successful');
            } else {
                logger.error(err);

                res.status(404).send("git deploy fail, please see log file");
            }
        });
});

app.listen(constants.port, function() {
    var logger = require('./scripts/logger.js');

    // console.log('listening to port 8080');
    logger.info('server started, listening to port 8080');
})
