const router = require('express').Router();
const queries = require('../lib/queries.js');
const util = require('@lenny_zhou/util');

const authorize = require('./auth.js').authorize;
const USERNAME_COL = process.env.USERNAME_COL;

// router.get('/:username', authorize, async (req, res) => {
router.get(`/:${USERNAME_COL}`, authorize, async (req, res) => {
	util.log(`GET to /follows/${req.params[USERNAME_COL]}:`);

	try {
		const dbRes = await queries.isFollowing(req.session.userID, req.params.username);
		// util.log(util.prettyJSON(dbRes), 4);
		// util.log(dbRes, 4);
		res.status(200).send({ following: dbRes });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.post('/', authorize, async (req, res) => {
	util.log('POST to /follows:');

	try {
		await queries.follow(req.session.userID, req.body[USERNAME_COL]);
		res.sendStatus(201); // 201 Created
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;