const USERS_TABLE = process.env.USERS_TABLE;
const SALTED_PASSWORD_HASHES_TABLE = process.env.SALTED_PASSWORD_HASHES_TABLE;
const POSTS_TABLE = process.env.POSTS_TABLE;

const ID_COLUMN = process.env.ID_COLUMN;
const USER_ID_COLUMN = process.env.USER_ID_COLUMN;

const EMAIL_COLUMN = process.env.EMAIL_COLUMN;
const SALTED_PASSWORD_HASH_COLUMN = process.env.SALTED_PASSWORD_HASH_COLUMN;
const POST_COLUMN = process.env.POST_COLUMN;
const TIME_POSTED_COLUMN = process.env.TIME_POSTED_COLUMN;

const pool = require('./pool.js');
const util = require('./util.js');

async function testConnect() {
	const query = 'SELECT $1::text as message;';
	const params = ['DB test query successful'];

	try {
		const res = await pool.query(query, params);
		console.log(`${res.rows[0].message}\n`);
	} catch (err) {
		console.error(err.stack);
	}
}

testConnect();

exports.getUserID = async (email) => {
	// console.log(`getUserID(${email}):`);

	const query = `SELECT ${ID_COLUMN} FROM ${USERS_TABLE} WHERE ${EMAIL_COLUMN} = $1;`;
	// console.log(`query: ${query}`);

	const params = [email];
	// console.log(`params: ${params}`);

	try {
		const res = await pool.query(query, params);
		// console.log(`res: ${util.prettyJSON(res)}`);

		if (res.rowCount === 0) {
			return null;
		} else {
			return res.rows[0][ID_COLUMN];
		}
	} catch (err) {
		console.error(err.stack);
		return null;
	}
};

// Don't log passwords

exports.getSaltedPasswordHash = async (userID) => {
	const query = `SELECT ${SALTED_PASSWORD_HASH_COLUMN} FROM ${SALTED_PASSWORD_HASHES_TABLE}
    WHERE ${USER_ID_COLUMN} = $1;`;

	const params = [userID];

	try {
		const res = await pool.query(query, params);

		if (res.rowCount === 1) {
			return res.rows[0][SALTED_PASSWORD_HASH_COLUMN];
		} else {
			return null;
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.registerUser = async (email, saltedPasswordHash) => {
	const client = await pool.connect();

	try {
		await client.query('BEGIN;');

		var query = `INSERT INTO ${USERS_TABLE}(${EMAIL_COLUMN}) VALUES ($1);`;
		var params = [email];
		await client.query(query, params);

		query = `INSERT INTO ${SALTED_PASSWORD_HASHES_TABLE}(${USER_ID_COLUMN},
			${SALTED_PASSWORD_HASH_COLUMN}) VALUES((SELECT ${ID_COLUMN} FROM ${USERS_TABLE}
			WHERE ${EMAIL_COLUMN} = $1), $2);`;

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
	const query = `INSERT INTO ${POSTS_TABLE}(${USER_ID_COLUMN}, ${POST_COLUMN},
		${TIME_POSTED_COLUMN}) VALUES($1, $2, to_timestamp($3 / 1000.0));`;

	const params = [userID, post, timePosted];

	try {
		await pool.query(query, params);
	} catch (err) {
		throw err;
	}
};

exports.getProfilePosts = async (userID) => {
	const query = `SELECT ${ID_COLUMN}, ${POST_COLUMN} FROM
	${POSTS_TABLE} WHERE ${USER_ID_COLUMN} = $1;`;

	const params = [userID];

	try {
		const res = await pool.query(query, params);
		return res;
	} catch (err) {
		console.error(err);
		throw err;
	}
}