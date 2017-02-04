module.exports = function security_check(secret_key) {
	return function(req, res, next) {
		var crypto = require('crypto');
		var logger = require('../scripts/logger.js');
		var xsignature = req.headers['x-hub-signature'].split("=");
	    var algo = xsignature[0];
	    var hash = xsignature[1] || null;
	    var body = req.body;
	    var payload_hash = crypto.createHmac('sha1', secret_key)
	                            .update(JSON.stringify(req.body)).digest('hex');

        if(payload_hash === hash) {
        	logger.info('hash check is OKAY');

        	next();
        } else {
        	logger.error('invalid request payload')

            res.status(400).send('invalid request');
        }
	}
};