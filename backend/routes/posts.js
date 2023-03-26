const router = require('express').Router();
const util = require('../util.js');
const redisStore = require('../sessions.js').store;

const POSTS_TABLE = process.env.POSTS_TABLE;

async function isAuthenticated(req, res, next) {
	console.log('isAuthenticated(req, res, next):');

	// try{
	// 	const session = await redisStore.get(req.session.id);

	// 	if(session === null || session === undefined){
	// 		console.log('session null or undefined');
	// 		res.sendStatus(401); // 401 Unauthorized
	// 	}else{
	// 		console.log('session found');
	// 		next();
	// 	}
	// }catch(err){
	// 	res.sendStatus(500); // 500 Internal Server Error
	// }
	// if(req.session.userID !== null && req.session.userID !== undefined){
	console.log(`req.session.userID: ${req.session.userID}`);
	if (req.session.userID) {
		// console.log('req.session.userID defined\n');
		next();
	} else {
		// console.log('req.session.userID null or undefined\n');
		res.sendStatus(401); // 401 Unauthorized
	}
}

router.post('/', isAuthenticated, (req, res) => {
	console.log('POST to /posts');

	// const query = `INSERT INTO ${POSTS_TABLE}`;
});

module.exports = router;