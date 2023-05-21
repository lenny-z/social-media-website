import express from 'express';
const router = express.Router();
// const router = require('express').Router();
// const queries = require('../lib/queries.mjs');
import * as queries from '../lib/queries.mjs';
// const util = require('@lenny_zhou/util');
// const distance = require('fastest-levenshtein').distance;
import { distance } from 'fastest-levenshtein';

const MAX_NUM_RESULTS = process.env.USER_SEARCH_MAX_NUM_RESULTS;

router.get('/', async (req, res) => {
	// util.log('GET to /search:');
	// util.log(`req.query.terms: ${req.query.terms}`, 1);
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

// module.exports = router;
export { router };