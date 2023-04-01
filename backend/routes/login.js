const router = require('express').Router();
const queries = require('../queries.js');
const argon2 = require('argon2');

const util = require('../util.js');
const session = require('../session.js');
// const util = new Util();

router.post('/', async (req, res) => {
	console.log('POST to /login:');

	try {
		const userID = await queries.getUserID(req.body.identifier);
		util.log(`\tuserID: ${userID}`);

		if (userID) {
			const saltedPasswordHash = await queries.getSaltedPasswordHash(userID);

			if (await argon2.verify(saltedPasswordHash, req.body.password)) {
				if (await session.set(req, userID)) {
					res.sendStatus(200); // 200 OK
				} else {
					res.sendStatus(500); // 500 Internal Server Error
				}
			} else {
				res.sendStatus(401); // 401 Unauthorized
			}
		} else {
			res.sendStatus(401);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;