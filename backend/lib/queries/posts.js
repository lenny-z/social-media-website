const pool = require('../pool.js');

exports.makePost = async (userID, parentID, body, timePosted) => {
	const query = `INSERT INTO posts(poster_id, parent_id, body, time_posted)
		VALUES($1, $2, $3, to_timestamp($4 / 1000.0));`;

	const params = [userID, parentID, body, timePosted];

	try {
		await pool.query(query, params);
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.getFeedPosts = async (userID) => {
	const query = `SELECT id, poster_username, time_posted, body, num_replies
		FROM posts_view WHERE parent_id IS NULL AND poster_id
		IN (SELECT followed_id FROM follows WHERE follower_id
		= $1 UNION SELECT $1);`;

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
	const query = `SELECT id, poster_username, time_posted, body, num_replies
		FROM posts_view WHERE parent_id IS NULL AND poster_username = $1;`;

	const params = [username];

	try {
		const res = await pool.query(query, params);
		return res.rows;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.getAllPosts = async () => {
	const query = `SELECT id, poster_username, time_posted, body, num_replies
		FROM posts_view;`;

	try {
		const res = await pool.query(query, params);
		return res.rows;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

exports.getReplyPosts = async (parentID) => {
	const query = `SELECT id, poster_username, time_posted, body, num_replies
		FROM posts_view WHERE parent_id = $1;`;

	const params = [parentID];

	try {
		const res = await pool.query(query, params);
		return res.rows;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

exports.getNumReplies = async (parentID) => {
	const query = `SELECT COUNT(*) FROM posts WHERE parent_id = $1;`;
	const params = [parentID];

	try {
		const res = await pool.query(query, params);
		console.log(res);
	} catch (err) {
		console.error(err);
		throw err;
	}
};