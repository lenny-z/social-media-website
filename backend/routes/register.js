const router = require('express').Router();
const queries = require('../queries.js');
const argon2 = require('argon2');
const util = require('../util.js');

const USERNAME_COL = process.env.USERNAME_COL;
const EMAIL_COL = process.env.EMAIL_COL;

router.post('/', async (req, res) => {
	console.log('POST to /register:');
	const userID = await queries.getUserID(req.body[EMAIL_COL])
		|| await queries.getUserID(req.body[USERNAME_COL]);

	util.devLog(`\tuserID: ${userID}`);

	if (userID === null) {
		try {
			const saltedPasswordHash = await argon2.hash(req.body.password);
			await queries.registerUser(req.body[EMAIL_COL], req.body[USERNAME_COL],
				saltedPasswordHash);

			// util.devLog(`\treq.session.userID: ${req.session.userID}`);

			// const newUserID = await queries.getUserID(req.body[EMAIL_COL]);
			// util.devLog(`newUserID: ${newUserID}`);
			req.session.destroy(async (err) => {
				if(err){
					res.sendStatus(500); // 500 Internal Server Error
				}else{
					try{
						req.session.userID = await queries.getUserID(req.body[EMAIL_COL]);
						util.devLog(`\treq.session.userID: ${req.session.userID}`);
						res.sendStatus(201); // 201 Created
					}catch(err){
						res.sendStatus(500);
					}
				}
			})

			// req.session.save((err) => {
			// 	if (err) {
			// 		res.sendStatus(500); // 500 Internal Server Error
			// 	} else {
			// 		res.sendStatus(201);
			// 	}
			// });

			// req.session.regenerate(async (err) => {
			// 	if (err) {
			// 		res.sendStatus(500); // 500 Internal Server Error
			// 	} else {
			// 		// req.session.userID = userID;
			// 		// req.session.userID = await queries.getUserID(req.body[USERNAME_COL]);
			// 		req.session.userID = newUserID;
			// 		console.log(`\treq.session.userID: ${req.session.userID}`);

			// 		req.session.save((err) => {
			// 			if (err) {
			// 				console.error(err);
			// 				res.sendStatus(500)
			// 			} else {
			// 				res.sendStatus(201); // 200 OK
			// 			}
			// 		});
			// 	}
			// });
			// res.sendStatus(201); // 201 Created
		} catch (err) {
			console.error(err);
			res.sendStatus(500); // 500 Internal Server Error
		}
	} else {
		res.sendStatus(409); // 409 Conflict
	}
});

module.exports = router;