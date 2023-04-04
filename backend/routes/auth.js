const router = require('express').Router();
const util = require('../lib/util.js');
const queries = require('../lib/queries.js');

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

module.exports = router;