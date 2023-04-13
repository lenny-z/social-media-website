const pool = require('./pool.js');
const util = require('./util.js');

const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

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
	util.log('getUserID:');
	var identifierCol = '';

	if (emailRegex.test(identifier)) {
		identifierCol = 'email';
	} else {
		identifierCol = 'username';
	}

	const query = `SELECT id FROM users WHERE ${identifierCol} = $1;`;
	const params = [identifier];

	try {
		const res = await pool.query(query, params);

		if (res.rowCount === 0) {
			return null;
		} else {
			return res.rows[0].id;
		}
	} catch (err) {
		console.error(err.stack);
		return null;
	}
};

exports.getUsername = async (id) => {
	util.log('getUsername:');

	const query = `SELECT username FROM users WHERE id = $1;`;
	const params = [id];

	try {
		const res = await pool.query(query, params);

		if (res.rowCount === 1) {
			return res.rows[0].username;
		} else {
			return null;
		}
	} catch (err) {
		console.error(err.stack);
		return null;
	}
};

exports.getSaltedPasswordHash = async (userID) => {
	const query = `SELECT salted_password_hash FROM salted_password_hashes
		WHERE user_id = $1;`;

	const params = [userID];

	try {
		const res = await pool.query(query, params);

		if (res.rowCount === 1) {
			return res.rows[0].salted_password_hash;
		} else {
			return null;
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.registerUser = async (email, username, saltedPasswordHash) => {
	var client;

	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		throw err;
	}

	try {
		await client.query('BEGIN;');

		var query = `INSERT INTO users(email, username) VALUES ($1, $2);`;
		var params = [email, username];
		await client.query(query, params);

		query = `INSERT INTO salted_password_hashes(user_id,
			salted_password_hash) VALUES((SELECT id FROM users
			WHERE email = $1), $2);`;

		params = [email, saltedPasswordHash];
		await client.query(query, params);
		await client.query('COMMIT;');
	} catch (err) {
		await client.query('ROLLBACK;');
		console.error(err);
		throw err;
	} finally {
		client.release();
	}
};

exports.post = async (userID, post, timePosted) => {
	const query = `INSERT INTO posts(user_id, post, time_posted)
		VALUES($1, $2, to_timestamp($3 / 1000.0));`;

	const params = [userID, post, timePosted];

	try {
		await pool.query(query, params);
	} catch (err) {
		throw err;
	}
};

exports.getProfilePosts = async (username) => {
	const query = `SELECT id, post, time_posted FROM posts WHERE user_id
		= (SELECT id FROM users WHERE username = $1);`;

	const params = [username];

	try {
		const res = await pool.query(query, params);
		util.log(util.prettyJSON(res));
		return res;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.getIdentifiers = async () => {
	// const query = `SELECT ${EMAIL_COL} AS identifier FROM ${USERS_TABLE} UNION
	// 	SELECT ${USERNAME_COL} FROM ${USERS_TABLE};`;

	// Protect email search; for now just return usernames

	const query = `SELECT id, username FROM users;`;

	try {
		const res = await pool.query(query);
		return res.rows;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.follow = async (followerID, followedUsername) => {
	const query = `INSERT INTO follows(follower_id, followed_id)
		VALUES($1, (SELECT id FROM users WHERE username = $2));`;

	const params = [followerID, followedUsername];

	try {
		const res = await pool.query(query, params);
		return res.rows;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

exports.isFollowing = async (followerID, followedUsername) => {
	const query = `SELECT EXISTS(SELECT 1 FROM follows WHERE follower_id = $1
		AND followed_id = (SELECT id FROM users WHERE username = $2));`;

	const params = [followerID, followedUsername];

	try {
		const res = await pool.query(query, params);
		return res.rows[0].exists;
	} catch (err) {
		console.error(err);
		throw err;
	}
};