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
				req.session.regenerate((err) => { // TODO: clean up this block
					if (err) {
						// next(err);
						res.sendStatus(500);
					} else {
						req.session.userID = userID;
						console.log(`req.session.userID: ${req.session.userID}`);

						req.session.save((err) => {
							if (err) {
								console.error(err);
								// return next(err);
								res.sendStatus(500) // 500 Internal Server Error
							} else {
								res.sendStatus(200); // 200 OK
							}
						});
						// await req.session.save();
						// res.sendStatus(200);
					}
				});
			} else {
				res.sendStatus(401); // 401 Unauthorized
			}
		} else {
			res.sendStatus(401); // 401 Unauthorized
		}

		// if (userID === null) {
		// 	// console.log('bleh');
		// 	res.sendStatus(401); // 401 Unauthorized
		// } else {
		// }
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;