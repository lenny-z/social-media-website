const router = require('express').Router();
const util = require('../lib/util.js');
const queries = require('../lib/queries.js');

async function authorize(req, res, next) {
	util.log('authorize(req, res, next):');
	util.log(`req.session.userID: ${req.session.userID}`, 4);

	if (req.session.userID) {
		next();
	} else {
		res.sendStatus(401); // 401 Unauthorized
	}
}

exports.authorize = authorize;

router.get('/authorize', authorize, async (req, res) => {
	// res
});

router.get('/', async (req, res) => {
	util.log('GET to /:');
	util.log(`\treq.session.userID: ${req.session.userID}`);

	if(req.session.userID){
		try{
			const username = await queries.getUsername(req.session.userID);
			util.log(`\tusername: ${username}`);
			res.status(200).send({username: username});
		}catch(err){
			console.error(err);
			res.sendStatus(500);
		}
	}else{
		res.sendStatus(401);
	}
});

// module.exports = router;
exports.router = router;