const router = require('express').Router();
const util = require('../util.js');
const redisStore = require('../sessions.js').store;

const POSTS_TABLE = process.env.POSTS_TABLE;

async function isAuthenticated(req, res, next) {
	console.log('isAuthenticated(req, res, next):');
	console.log(`req.session.userID: ${req.session.userID}`);

	if (req.session.userID) {
		next();
	} else {
		res.sendStatus(401); // 401 Unauthorized
	}
}

router.post('/', isAuthenticated, (req, res) => {
	console.log('POST to /posts');

	// const query = `INSERT INTO ${POSTS_TABLE}`;
});

module.exports = router;