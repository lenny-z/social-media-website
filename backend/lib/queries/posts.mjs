import pool from '../pool.mjs';

export async function makePost(userID, parentID, body, timePosted) {
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

export async function getFeedPosts(userID) {
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

export async function getProfilePosts(username) {
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

export async function getAllPosts() {
	const query = `SELECT id, poster_username, time_posted, body, num_replies
		FROM posts_view WHERE parent_id IS NULL;`;

	try {
		const res = await pool.query(query);
		return res.rows;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function getReplyPosts(parentID) {
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