import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as queries from '../lib/queries.mjs';
import { distance } from 'fastest-levenshtein';

const MAX_NUM_RESULTS = process.env.USER_SEARCH_MAX_NUM_RESULTS;
const router = express.Router();

router.get('/', async (req, res) => {
	const identifiers = await queries.getIdentifiers();
	const terms = req.query.terms;

	if (terms) {
		identifiers.sort((a, b) => {
			return distance(req.query.terms, a.username)
				- distance(req.query.terms, b.username);
		});
	}

	res.status(200).send(identifiers.slice(0, MAX_NUM_RESULTS));
});

export { router };