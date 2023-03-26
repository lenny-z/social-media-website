const router = require('express').Router();
const queries = require('../queries.js');
const argon2 = require('argon2');

router.post('/', async (req, res) => {
	console.log('POST to /login:');

	try {
		const userID = await queries.getUserID(req.body.username);
		console.log(`userID: ${userID}`);

		if (userID) {
			const saltedPasswordHash = await queries.getSaltedPasswordHash(userID);

			if (await argon2.verify(saltedPasswordHash, req.body.password)) {
				req.session.regenerate((err) => {
					if (err) {
						res.sendStatus(500); // 500 Internal Server Error
					} else {
						req.session.userID = userID;
						console.log(`req.session.userID: ${req.session.userID}`);

						req.session.save((err) => {
							if (err) {
								console.error(err);
								res.sendStatus(500)
							} else {
								res.sendStatus(200); // 200 OK
							}
						});
					}
				});
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