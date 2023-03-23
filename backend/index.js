require('dotenv').config(); // State this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const RedisStore = require('connect-redis').default;
const session = require('express-session'); // Consider Redis as session store
const redis = require('redis');

// import RedisStore from 'connect-redis';
// import session from 'express-session';
// import {createClient} from 'redis';

const crypto = require('crypto');
const queries = require('./queries.js');
const argon2 = require('argon2');

const sessionSecret = crypto.randomBytes(256).toString('hex');

const sessionOptions = {
	secret: sessionSecret,
	resave: false, // Enable only for session stores that don't support 'touch' command
	rolling: false, // 'Force the session identifier cookie to be set on every response' (express-session)
	saveUninitialized: true,

	cookie: {
		secure: false, // Set to true once HTTPS enabled
		maxAge: 60 * 24 * 60 * 60 * 1000
	}
};

const redisClient = redis.createClient({
	socket:{
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT
	}
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(session(sessionOptions));

queries.testConnect();

function isAuthenticated(req, res, next){
	// if()
}

// To avoid injection attacks, don't directly concatenate parameters to query
// Instead, use parameterized queries

app.post('/login', async (req, res) => {
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
						return next(err);
					}

					res.redirect('/home');
				});
			});
		}
	}
});

const registerRouter = require('./routes/register.js');

app.use('/register', registerRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}\n`);
});