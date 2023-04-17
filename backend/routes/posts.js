const router = require('express').Router();
const queries = require('../lib/queries/posts.js');
const util = require('@lenny_zhou/util');
const authorize = require('./auth.js').authorize;

router.post('/', authorize, async (req, res) => {
	console.log('POST to /posts:');

	try {
		await queries.makePost(req.session.userID, req.body.post, Date.now());
		res.sendStatus(201); // 201 Created
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // 500 Internal Server Error
	}
});

router.get('/profile/:username', async (req, res) => {
	util.log('GET to /posts/profile:');

	try {
		const dbRes = await queries.getProfilePosts(req.params.username);
		res.status(200).send(dbRes.rows); // 200 OK
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.get('/feed', authorize, async (req, res) => {
	util.log('GET to /posts/feed:');

	try{
		const dbRes = await queries.getFeedPosts(req.session.userID);
		res.status(200).send(dbRes);
	}catch(err){
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;