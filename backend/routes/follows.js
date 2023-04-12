const router = require('express').Router();
const queries = require('../lib/queries.js');
const util = require('@lenny_zhou/util');

const authorize = require('./auth.js').authorize;

router.post('/', authorize, async (req, res) => {
	util.log('POST to /follows:');
});

module.exports = router;