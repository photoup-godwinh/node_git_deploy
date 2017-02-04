module.exports = function verify_branch(branch) {
	return function(req, res, next) {
		var logger = require('../scripts/logger.js');

		if(req.body.ref !== branch) {
			logger.error('invalid request payload')

            res.status(400).send('invalid request');
		} else {
			logger.info('hash the same');

			next();
		}
	};
};