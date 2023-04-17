const router = require('express').Router();
const queries = require('../lib/queries.js');
const util = require('@lenny_zhou/util');
const distance = require('fastest-levenshtein').distance;

const MAX_NUM_RESULTS = process.env.USER_SEARCH_MAX_NUM_RESULTS;

router.get('/', async (req, res) => {
	util.log('GET to /search:');
	const identifiers = await queries.getIdentifiers();
	util.log(req.query.terms);

	identifiers.sort((a, b) => {
		return distance(req.query.terms, a.username)
			- distance(req.query.terms, b.username);
	});

	res.status(200).send(identifiers.slice(0, MAX_NUM_RESULTS));
});

module.exports = router;