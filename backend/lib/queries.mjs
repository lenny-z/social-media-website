import pool from './pool.mjs';
import * as validator from '@lenny_zhou/validator';

const emailRegex = validator.emailRegex;

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

export async function emailExists(email) {
	const query = `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1);`;
	const params = [email];

	try {
		const res = await pool.query(query, params);
		return res.rows[0].exists === true;
	} catch (err) {
		throw err;
	}
}

export async function usernameExists(username) {
	const query = `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1);`;
	const params = [username];

	try {
		const res = await pool.query(query, params);
		return res.rows[0].exists === true;
	} catch (err) {
		throw err;
	}
}

export async function getUserID(identifier) {
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

export async function getUsername(id) {
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
		throw err;
	}
};

export async function getSaltedPasswordHash(userID) {
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

export async function registerUser(email, username, saltedPasswordHash) {
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

export async function getIdentifiers() {
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