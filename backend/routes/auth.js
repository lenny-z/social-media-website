const router = require('express').Router();
const util = require('@lenny_zhou/util');
const queries = require('../lib/queries.js');
const argon2 = require('argon2');
const session = require('../lib/session.js');

function authorize(req, res, next) {
	if (req.session && req.session.userID) {
		next();
	} else {
		res.sendStatus(401); // 401 Unauthorized
	}
}

exports.authorize = authorize;

router.get('/authorize', authorize, async (req, res) => {
	// if (req.session.userID) {
	try {
		const username = await queries.getUsername(req.session.userID);

		if(username){
			res.status(200).send({ username: username });
		}else{
			res.sendStatus(401);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
	// } else {
	// res.sendStatus(401);
	// }
});

router.post('/login', async (req, res) => {
	// console.log('POST to /login:');

	try {
		const userID = await queries.getUserID(req.body.identifier);
		// util.log(`userID: ${userID}`, 1);

		if (userID) {
			const saltedPasswordHash = await queries.getSaltedPasswordHash(userID);

			if (await argon2.verify(saltedPasswordHash, req.body.password)) {
				if (await session.set(req, userID)) {
					const username = await queries.getUsername(userID);
					// res.sendStatus(200); // 200 OK
					res.status(200).send({username: username});
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

router.post('/logout', authorize, (req, res) => {
	util.log('POST to /logout:')
	req.session.userID = null;

	// req.session.save((err) => {
	// 	if (err) {
	// 		res.sendStatus(500);
	// 	} else {
	// 		req.session.regenerate((err) => {
	// 			if (err) {
	// 				res.sendStatus(500);
	// 			} else {
	// 				res.sendStatus(200);
	// 			}
	// 		})
	// 	}
	// })
	req.session.destroy((err) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	})
});

router.post('/register', async (req, res) => {
	console.log('POST to /register:');

	try {
		const userID = await queries.getUserID(req.body.email)
			|| await queries.getUserID(req.body.username);

		util.log(`userID: ${userID}`, 1);

		if (userID === null) {
			const saltedPasswordHash = await argon2.hash(req.body.password);
			await queries.registerUser(req.body.email, req.body.username,
				saltedPasswordHash);

			const newUserID = await queries.getUserID(req.body.email);
			util.log(`newUserID: ${newUserID}`, 1);

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

exports.router = router;