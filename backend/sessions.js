const redis = require('redis');
const RedisStore = require('connect-redis').default;
const session = require('express-session');

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

// const cookieSecure = process.env.NODE_ENV === 'production';
// console.log(cookieSecure);

const sessionOptions = {
	name: process.env.APP_NAME,
	resave: false, // Enable only for session stores that don't support 'touch' command
	rolling: false, // 'Force the session identifier cookie to be set on every response' (express-session)
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET,
	store: redisStore,

	cookie: {
		httpOnly: true,
		maxAge: 60 * 24 * 60 * 60 * 1000,
		path: '/',
		// secure: false, // Set to true once HTTPS enabled
		secure: process.env.NODE_ENV === 'production'
		// secure: cookieSecure
	}
};

console.log(sessionOptions.cookie);

// exports.manager = session(sessionOptions);
// exports.store = redisStore;
module.exports = session(sessionOptions);