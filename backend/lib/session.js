const redis = require('redis');
const RedisStore = require('connect-redis').default;
const session = require('express-session');
// const util = require('./util.js');
const util = require('@lenny_zhou/util');

const redisClient = redis.createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT
	}
});

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
	client: redisClient,
	prefix: process.env.APP_NAME
});

const sessionOptions = {
	name: process.env.APP_NAME,
	resave: false, // Enable only for session stores that don't support 'touch' command
	rolling: true, // 'Force the session identifier cookie to be set on every response' (express-session)
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET,
	store: redisStore,

	cookie: {
		httpOnly: true,
		maxAge: 60 * 24 * 60 * 60 * 1000,
		path: '/',
		secure: process.env.NODE_ENV === 'production'
	}
};

exports.manager = session(sessionOptions);

exports.set = (req, userID) => {
	util.log(`session.set:`);

	return new Promise((resolve, reject) => {
		req.session.regenerate((err) => {
			if (err) {
				console.error(err);
				reject(false);
			} else {
				req.session.userID = userID;
				util.log(`req.session.userID: ${req.session.userID}`, 4);

				req.session.save((err) => {
					if (err) {
						console.error(err);
						reject(false);
					} else {
						resolve(true);
					}
				});
			}
		});
	});
};