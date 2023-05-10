const router = require('express').Router();
// const util = require('@lenny_zhou/util');
const queries = require('../lib/queries.js');
const argon2 = require('argon2');
const session = require('../lib/session.js');
const validator = require('@lenny_zhou/validator');

function authorize(req, res, next) {
	if (req.session && req.session.userID) {
		next();
	} else {
		res.sendStatus(401); // 401 Unauthorized
	}
}

exports.authorize = authorize;

router.get('/authorize', authorize, async (req, res) => {
	try {
		const username = await queries.getUsername(req.session.userID);

		if (username) {
			res.status(200).send(username);
		} else {
			res.sendStatus(401);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.post('/login', async (req, res) => {
	try {
		const userID = await queries.getUserID(req.body.identifier);

		if (userID) {
			const saltedPasswordHash = await queries.getSaltedPasswordHash(userID);

			if (await argon2.verify(saltedPasswordHash, req.body.password)) {
				if (await session.set(req, userID)) {
					const username = await queries.getUsername(userID);
					res.status(200).send(username);
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
	req.session.userID = null;

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

	const emailReqsMet = validator.reqsMet(
		validator.email(req.body.email)
	);

	const usernameReqsMet = validator.reqsMet(
		validator.username(req.body.username)
	);

	const passwordReqsMet = validator.reqsMet(
		validator.password(req.body.password)
	);

	if (
		validator.allReqsMet(emailReqsMet)
		&& validator.allReqsMet(usernameReqsMet)
		&& validator.allReqsMet(passwordReqsMet)
	) {
		try {
			const userID = await queries.getUserID(req.body.email)
				|| await queries.getUserID(req.body.username);

			if (userID === null) {
				const saltedPasswordHash = await argon2.hash(req.body.password);
				await queries.registerUser(req.body.email, req.body.username,
					saltedPasswordHash);

				const newUserID = await queries.getUserID(req.body.email);

				if (await session.set(req, newUserID)) {
					const username = await queries.getUsername(newUserID);
					res.status(201).send(username);
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
	} else {
		const resBody = {
			email: emailReqsMet.notMet,
			username: usernameReqsMet.notMet,
			password: passwordReqsMet.notMet
		}

		res.status(400).send(resBody);
	}
});

exports.router = router;