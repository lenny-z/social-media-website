import dotenv from 'dotenv';
dotenv.config();

import redis from 'redis';
import RedisStore from 'connect-redis';
import session from 'express-session';

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
	unset: 'destroy',

	cookie: {
		httpOnly: true,
		maxAge: 60 * 24 * 60 * 60 * 1000,
		path: '/',
		secure: process.env.NODE_ENV === 'production'
	}
};

export const manager = session(sessionOptions);

export function set(req, userID) {
	return new Promise((resolve, reject) => {
		req.session.regenerate((err) => {
			if (err) {
				console.error(err);
				reject(false);
			} else {
				req.session.userID = userID;

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