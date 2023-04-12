const router = require('express').Router();
const queries = require('../lib/queries.js');
const util = require('@lenny_zhou/util');

const authorize = require('./auth.js').authorize;
const USERNAME_COL = process.env.USERNAME_COL;

router.get(`/:${USERNAME_COL}`, authorize, async (req, res) => {
	util.log(`GET to /follows/${req.params[USERNAME_COL]}:`);

	try {
		const dbRes = await queries.isFollowing(req.session.userID, req.params[USERNAME_COL]);
		res.status(200).send({ isFollowing: dbRes });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.post('/', authorize, async (req, res) => {
	util.log('POST to /follows:');
	const followerID = req.session.userID;
	const followedUsername = req.body[USERNAME_COL];

	try {
		if (await queries.isFollowing(followerID, followedUsername)) {
			res.sendStatus(409); // 409 Conflict
		} else {
			await queries.follow(followerID, followedUsername);
			res.sendStatus(201); // 201 Created
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;