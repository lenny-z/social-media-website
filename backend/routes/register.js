const router = require('express').Router();
const queries = require('../queries.js');
const db = require('../db-names.js');
const argon2 = require('argon2');

console.log(db);

router.post('/', async (req, res) => {
	console.log('POST to /register:');
	const userID = await queries.getUserID(req.body.username);

	if (userID === null) {
		try{
			const saltedPasswordHash = await argon2.hash(req.body.password);
			await queries.registerUser(req.body.username, saltedPasswordHash);
		}catch(err){
			console.error(err);
			res.sendStatus(500) // 500 Internal Server Error
		}
	} else {
		res.sendStatus(409); // 409 Conflict
	}
});

module.exports = router;