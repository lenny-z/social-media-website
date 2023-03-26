const router = require('express').Router();
const util = require('../util.js');
const redisStore = require('../sessions.js').store;

const POSTS_TABLE = process.env.POSTS_TABLE;

async function isAuthenticated(req, res, next) {
	console.log('isAuthenticated(req, res, next):');
	console.log(await redisStore.all());
	try{
		const session = await redisStore.get(req.session.id);
		console.log(session);

	}catch(err){
		console.error(err);
	}
	// console.log(`session: ${util.prettyJSON(session)}`);

	// if (await redisStore.get(req.session.id)) {
	// console.log('pog');
	// console.log()
	if (session) {
		console.log('next()');
		next();
	}
}

// router.route('/').post(isAuthenticated, (req, res) => {
router.post('/', isAuthenticated, (req, res) => {
	console.log('POST to /posts');

	const query = `INSERT INTO ${POSTS_TABLE}`;
});

module.exports = router;