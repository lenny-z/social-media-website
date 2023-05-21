import express from 'express';
import * as queries from '../lib/queries/posts.mjs';
import { authorize } from './auth.mjs';

const router = express.Router();

router.post('/', authorize, async (req, res) => {
	try {
		await queries.makePost(
			req.session.userID,
			req.body.parentID,
			req.body.body,
			Date.now()
		);

		res.sendStatus(201); // 201 Created
	} catch (err) {
		res.sendStatus(500); // 500 Internal Server Error
	}
});

router.get('/profile/:username', async (req, res) => {
	try {
		const dbRes = await queries.getProfilePosts(req.params.username);
		res.status(200).send(dbRes); // 200 OK
	} catch (err) {
		res.sendStatus(500);
	}
});

router.get('/feed', authorize, async (req, res) => {
	try {
		const dbRes = await queries.getFeedPosts(req.session.userID);
		res.status(200).send(dbRes);
	} catch (err) {
		res.sendStatus(500);
	}
});

router.get('/all', async (req, res) => {
	try {
		const dbRes = await queries.getAllPosts();
		res.status(200).send(dbRes);
	} catch (err) {
		res.sendStatus(500);
	}
});

router.get('/replies/:postID', async (req, res) => {
	try {
		const dbRes = await queries.getReplyPosts(req.params.postID);
		res.status(200).send(dbRes);
	} catch (err) {
		res.sendStatus(500);
	}
});

export { router };