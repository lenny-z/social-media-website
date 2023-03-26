const redis = require('redis');
const RedisStore = require('connect-redis').default;
const session = require('express-session');
const crypto = require('crypto');

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

const sessionSecret = crypto.randomBytes(256).toString('hex');

const sessionOptions = {
	name: process.env.APP_NAME,
	resave: false, // Enable only for session stores that don't support 'touch' command
	rolling: false, // 'Force the session identifier cookie to be set on every response' (express-session)
	saveUninitialized: true,
	secret: sessionSecret,
	store: redisStore,

	cookie: {
		httpOnly: true,
		maxAge: 60 * 24 * 60 * 60 * 1000,
		secure: false, // Set to true once HTTPS enabled
	}
};

exports.manager = () => {
	return session(sessionOptions);
};

module.exports = () => {
	return session(sessionOptions);
}