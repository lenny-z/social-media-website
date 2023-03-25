const router = require('express').Router();
const queries = require('../queries.js');
const argon2 = require('argon2');

router.post('/', async(req, res) => {
	console.log('POST to /login:');

	const userID = await queries.getUserID(req.body.username);

	if (userID === null) {
		console.log('bleh');
	} else {
		const saltedPasswordHash = await queries.getSaltedPasswordHash(userID);

		if (await argon2.verify(saltedPasswordHash, req.body.password)) {
			req.session.regenerate((err) => { // TODO: clean up this block
				if (err) {
					next(err);
				}

				req.session.userID = userID;
				req.session.save((err) => {
					if (err) {
						console.error(err);
						return next(err);
					}

					res.sendStatus(200); // 200 OK
				});
			});
		} else {
			res.sendStatus(401); // 401 Unauthorized
		}
	}
});

module.exports = router;