const router = require('express').Router();
const queries = require('../lib/queries.js');
const util = require('../lib/util.js');

const POST_COL = process.env.POST_COL;

async function authorize(req, res, next) {
	util.log('authorize(req, res, next):');
	util.log(`\treq.session.userID: ${req.session.userID}`);

	if (req.session.userID) {
		next();
	} else {
		res.sendStatus(401); // 401 Unauthorized
	}
}

router.post('/', authorize, async (req, res) => {
	console.log('POST to /posts:');

	try {
		await queries.post(req.session.userID, req.body[POST_COL], Date.now());
		res.sendStatus(201); // 201 Created
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // 500 Internal Server Error
	}
});

router.get('/profile/:username', async (req, res) => {
	util.log('GET to /posts/profile:');
	util.log(`req.params: ${util.prettyJSON(req.params)}`, 8);

	try {
		const dbRes = await queries.getProfilePosts(req.params.username);
		res.status(200).send(dbRes.rows); // 200 OK
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;