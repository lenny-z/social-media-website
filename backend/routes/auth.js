const router = require('express').Router();
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

	const validateEmail = validator.email(req.body.email);
	const validateUsername = validator.username(req.body.username);
	const validatePassword = validator.password(req.body.password);

	const validateRetypedPassword = validator.retypedPassword(
		req.body.password,
		req.body.retypedPassword
	);

	const emailIsValid = validator.allReqsMet(validateEmail) === true;
	const usernameIsValid = validator.allReqsMet(validateUsername) === true;
	const passwordIsValid = validator.allReqsMet(validatePassword) === true;

	const retypedPasswordIsValid = validator.allReqsMet(
		validateRetypedPassword
	) === true;

	if (
		emailIsValid === true
		&& usernameIsValid === true
		&& passwordIsValid === true
		&& retypedPasswordIsValid === true
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
			email: validator.reqsNotMet(validateEmail),
			username: validator.reqsNotMet(validateUsername),
			password: validator.reqsNotMet(validatePassword),
			retypedPassword: validator.reqsNotMet(validateRetypedPassword)
		}

		res.status(400).send(resBody);
	}
});

router.get('/username-exists/:username', async (req, res) => {
	console.log('GET to /username-exists');

	try {
		const dbRes = await queries.usernameExists(req.params.username);
		res.status(200).send(dbRes);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.get('/email-exists/:email', async (req, res) => {
	console.log('GET to /email-exists');

	try {
		const dbRes = await queries.emailExists(req.params.email);
		res.status(200).send(dbRes);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

exports.router = router;