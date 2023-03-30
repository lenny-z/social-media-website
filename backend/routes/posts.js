const router = require('express').Router();
const util = require('../util.js');
const queries = require('../queries.js');

const POST_COL = process.env.POST_COL;

async function authorize(req, res, next) {
	// console.log('authorize(req, res, next):');
	// console.log(`req.session.userID: ${req.session.userID}`);
	util.devLog('authorize(req, res, next):');
	util.devLog(`\treq.session.userID: ${req.session.userID}`);

	if (req.session.userID) {
		next();
	} else {
		res.sendStatus(401); // 401 Unauthorized
	}
}

router.post('/', authorize, async (req, res) => {
	console.log('POST to /posts:');

	try{
		await queries.post(req.session.userID, req.body[POST_COL], Date.now());
		res.sendStatus(201); // 201 Created
	}catch(err){
		console.error(err);
		res.sendStatus(500); // 500 Internal Server Error
	}
});

router.get('/profile', async(req, res) => {
	console.log('GET to /posts/profile:');

	try{
		const dbRes = await queries.getProfilePosts(req.session.userID);
		res.status(200).send(dbRes.rows); // 200 OK
	}catch(err){
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;