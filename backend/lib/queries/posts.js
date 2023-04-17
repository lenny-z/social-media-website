const pool = require('../pool.js');

exports.makePost = async (userID, post, timePosted) => {
	const query = `INSERT INTO posts(poster_id, body, time_posted)
		VALUES($1, $2, to_timestamp($3 / 1000.0));`;

	const params = [userID, post, timePosted];

	try {
		await pool.query(query, params);
	} catch (err) {
		throw err;
	}
};

exports.getFeedPosts = async (userID) => {
	const query = `SELECT posts.id, username, time_posted, body
		FROM users INNER JOIN posts ON users.id = poster_id
		WHERE poster_id
		IN (SELECT followed_id FROM follows WHERE follower_id = $1);`;

	const params = [userID];

	try {
		const res = await pool.query(query, params);
		return res.rows;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.getProfilePosts = async (username) => {
	const query = `SELECT posts.id, username, time_posted, body
		FROM users INNER JOIN posts ON users.id = poster_id
		WHERE poster_id = (SELECT id FROM users WHERE username = $1);`;

	const params = [username];

	try {
		const res = await pool.query(query, params);
		return res;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
