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
/*
app.post('/deploy2', jsonParser, function(req, res) {
    var crypto = require('crypto');
    var exec_process = require('./scripts/exec_process.js');
    var logger = require('./scripts/logger.js');

    var secret = 'B49833BA7EEDB3F349B77B3594B55';
    var branch = 'refs/heads/develop';

    var xsignature = req.headers['x-hub-signature'].split("=");
    var algo = xsignature[0];
    var hash = xsignature[1] || null;
    var body = req.body;
    var payload_hash = crypto.createHmac('sha1', secret)
                            .update(JSON.stringify(req.body)).digest('hex');

    // create middleware later for checking of branch
    if(body.ref === branch) {
        // create middleware later for verifying request
        if(payload_hash === hash) {
            logger.info('hash the same');

            exec_process.result("sh shell_scripts/deploy.sh", function(err, response) {
                if(!err) {
                    logger.info(response);

                    res.send('git deploy successful');
                } else {
                    logger.error(err);

                    res.status(404).send("git deploy fail, please see log file");
                }
            });
        } else {
            logger.error('invalid request payload')

            res.status(400).send('invalid request');
        }
    }
});
**/

app.listen(8080, function() {
    var logger = require('./scripts/logger.js');

    // console.log('listening to port 8080');
    logger.info('server started, listening to port 8080');
})
