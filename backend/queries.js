const USERS_TABLE = process.env.USERS_TABLE;
const SALTED_PASSWORD_HASHES_TABLE = process.env.SALTED_PASSWORD_HASHES_TABLE;
const POSTS_TABLE = process.env.POSTS_TABLE;

const ID_COL = process.env.ID_COLUMN;
const USER_ID_COL = process.env.USER_ID_COLUMN;

const EMAIL_COL = process.env.EMAIL_COL;
const USERNAME_COL = process.env.USERNAME_COL;
const SALTED_PASSWORD_HASH_COL = process.env.SALTED_PASSWORD_HASH_COLUMN;
const POST_COL = process.env.POST_COL;
const TIME_POSTED_COL = process.env.TIME_POSTED_COLUMN;

const pool = require('./pool.js');
const util = require('./util.js');

const EMAIL_REGEX = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

async function testConnect() {
	const query = 'SELECT $1::text as message;';
	const params = ['DB test query successful'];

	try {
		const res = await pool.query(query, params);
		console.log(`${res.rows[0].message}`);
	} catch (err) {
		console.error(err.stack);
	}
}

testConnect();

exports.getUserID = async (identifier) => {
	util.devLog(`getUserID:`)
	var identifierCol = '';

	if (EMAIL_REGEX.test(identifier)) {
		identifierCol = EMAIL_COL;
	} else {
		identifierCol = USERNAME_COL;
	}

	const query = `SELECT ${ID_COL} FROM ${USERS_TABLE} WHERE ${identifierCol} = $1;`;
	const params = [identifier];

	try {
		const res = await pool.query(query, params);

		if (res.rowCount === 0) {
			return null;
		} else {
			return res.rows[0][ID_COL];
		}
	} catch (err) {
		console.error(err.stack);
		return null;
	}
};

// Don't log passwords

exports.getSaltedPasswordHash = async (userID) => {
	const query = `SELECT ${SALTED_PASSWORD_HASH_COL} FROM ${SALTED_PASSWORD_HASHES_TABLE}
    WHERE ${USER_ID_COL} = $1;`;

	const params = [userID];

	try {
		const res = await pool.query(query, params);

		if (res.rowCount === 1) {
			return res.rows[0][SALTED_PASSWORD_HASH_COL];
		} else {
			return null;
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.registerUser = async (email, username, saltedPasswordHash) => {
	// var client;
	const client = await pool.connect();

	try {
		// client = await pool.connect();
		await client.query('BEGIN;');

		var query = `INSERT INTO ${USERS_TABLE}(${EMAIL_COL}, ${USERNAME_COL}) VALUES ($1, $2);`;
		var params = [email, username];
		await client.query(query, params);

		query = `INSERT INTO ${SALTED_PASSWORD_HASHES_TABLE}(${USER_ID_COL},
			${SALTED_PASSWORD_HASH_COL}) VALUES((SELECT ${ID_COL} FROM ${USERS_TABLE}
			WHERE ${EMAIL_COL} = $1), $2);`;

		params = [email, saltedPasswordHash];
		await client.query(query, params);
		await client.query('COMMIT;');
	} catch (err) {
		await client.query('ROLLBACK;');
		throw err;
	} finally {
		client.release();
	}
};

exports.post = async (userID, post, timePosted) => {
	const query = `INSERT INTO ${POSTS_TABLE}(${USER_ID_COL}, ${POST_COL},
		${TIME_POSTED_COL}) VALUES($1, $2, to_timestamp($3 / 1000.0));`;

	const params = [userID, post, timePosted];

	try {
		await pool.query(query, params);
	} catch (err) {
		throw err;
	}
};

exports.getProfilePosts = async (userID) => {
	const query = `SELECT ${ID_COL}, ${POST_COL}, ${TIME_POSTED_COL} FROM
	${POSTS_TABLE} WHERE ${USER_ID_COL} = $1;`;

	const params = [userID];

	try {
		const res = await pool.query(query, params);
		return res;
	} catch (err) {
		console.error(err);
		throw err;
	}
}