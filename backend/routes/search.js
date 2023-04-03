const router = require('express').Router();
const queries = require('../queries.js');
const util = require('../util.js');
const distance = require('fastest-levenshtein').distance;

const MAX_NUM_RESULTS = process.env.USER_SEARCH_MAX_NUM_RESULTS;

router.get('/', async (req, res) => {
	util.log('GET to /search:');
	const identifiers = await queries.getIdentifiers();
	util.log(identifiers);

	identifiers.sort((a, b) => {
		return distance(req.body.term, a.identifier)
			- distance(req.body.term, b.identifier);
	});

	res.status(200).send(identifiers.slice(0, MAX_NUM_RESULTS));
});

module.exports = router;