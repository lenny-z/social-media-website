const router = require('express').Router();
const queries = require('../queries.js');
const db = require('../db-names.js');
const argon2 = require('argon2');

const USERNAME_COL = process.env.USERNAME_COL;
const EMAIL_COL = process.env.EMAIL_COL;

router.post('/', async (req, res) => {
	console.log('POST to /register:');
	// const userID = await queries.getUserID(req.body.username);
	const userID = await queries.getUserID(req.body[USERNAME_COL])
		&& queries.getUserID(req.body[EMAIL_COL]);

	if (userID === null) {
		try{
			const saltedPasswordHash = await argon2.hash(req.body.password);
			await queries.registerUser(req.body.username, saltedPasswordHash);
			res.sendStatus(201); // 201 Created
		}catch(err){
			console.error(err);
			res.sendStatus(500); // 500 Internal Server Error
		}
	} else {
		res.sendStatus(409); // 409 Conflict
	}
});

module.exports = router;