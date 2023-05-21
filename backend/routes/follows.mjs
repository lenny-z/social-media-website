// const router = require('express').Router();
import express from 'express';
const router = express.Router();
// const queries = require('../lib/queries.js');
// const queries = require('../lib/queries/follows.js');
import * as queries from '../lib/queries/follows.mjs';
// const authorize = require('./auth.mjs').authorize;
import { authorize } from './auth.mjs';

router.post('/', authorize, async (req, res) => {
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
	try {
		const dbRes = await queries.getFollow(
			req.session.userID,
			req.params.username
		);

		res.status(200).send({ isFollowing: dbRes === true });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});


router.delete('/:username', authorize, async (req, res) => {
	try {
		await queries.deleteFollow(
			req.session.userID,
			req.params.username
		);

		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// module.exports = router;
export { router }