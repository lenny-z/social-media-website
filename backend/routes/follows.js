const router = require('express').Router();
const queries = require('../lib/queries.js');
const util = require('@lenny_zhou/util');
const authorize = require('./auth.js').authorize;

router.post('/', authorize, async (req, res) => {
	util.log('POST to /follows:');

	try {
		await queries.makeFollow(
			req.session.userID,
			req.body.username
		);
		
		res.sendStatus(201); // 201 Created
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.get(`/:username`, authorize, async (req, res) => {
	util.log(`GET to /follows/${req.params.username}:`);

	try {
		const dbRes = await queries.getFollow(
			req.session.userID,
			req.params.username
		);

		res.status(200).send({ isFollowing: dbRes === true});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});


router.delete('/:username', authorize, async (req, res) => {
	util.log('DELETE to /follows:');

	try{
		await queries.deleteFollow(
			req.session.userID,
			req.params.username
		);

		res.sendStatus(200);
	}catch(err){
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;