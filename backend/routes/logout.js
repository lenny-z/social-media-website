const router = require('express').Router();
const util = require ('../lib/util.js');

router.post('/', (req, res) => {
	util.log('GET to /:')
	req.session.userID = null;

	req.session.save((err) => {
		if(err){
			res.sendStatus(500);
		}else{
			req.session.regenerate((err) => {
				if(err){
					res.sendStatus(500);
				}else{
					res.sendStatus(200);
				}
			})
		}
	})
});

module.exports = router;