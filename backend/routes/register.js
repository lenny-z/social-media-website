const router = require('express').Router();
const argon2 = require('argon2');
const queries = require('../lib/queries.js');
const util = require('../lib/util.js');
const session = require('../lib/session.js');

const USERNAME_COL = process.env.USERNAME_COL;
const EMAIL_COL = process.env.EMAIL_COL;

router.post('/', async (req, res) => {
	console.log('POST to /register:');

	try {
		const userID = await queries.getUserID(req.body[EMAIL_COL])
			|| await queries.getUserID(req.body[USERNAME_COL]);

		util.log(`\tuserID: ${userID}`);

		if (userID === null) {
			const saltedPasswordHash = await argon2.hash(req.body.password);
			await queries.registerUser(req.body[EMAIL_COL], req.body[USERNAME_COL],
				saltedPasswordHash);

			const newUserID = await queries.getUserID(req.body[EMAIL_COL]);
			util.log(`\newUserID: ${newUserID}`);

			if (await session.set(req, newUserID)) {
				res.sendStatus(201); // 201 Created
			} else {
				res.sendStatus(500); // 500 Internal Server Error
			}
		} else {
			res.sendStatus(409); // 409 Conflict
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;