import pool from '../pool.mjs';

export async function makeFollow(followerID, followedUsername) {
	const query = `INSERT INTO follows(follower_id, followed_id)
		VALUES($1, (SELECT id FROM users WHERE username = $2));`;

	const params = [followerID, followedUsername];

	try {
		await pool.query(query, params);
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function getFollow(followerID, followedUsername) {
	const query = `SELECT EXISTS(SELECT 1 FROM follows WHERE follower_id = $1
		AND followed_id = (SELECT id FROM users WHERE username = $2));`;

	const params = [followerID, followedUsername];

	try {
		const res = await pool.query(query, params);
		return res.rows[0].exists === true;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export async function deleteFollow(followerID, followedUsername) {
	const query = `DELETE FROM follows WHERE follower_id = $1 AND followed_id
		= (SELECT id FROM users WHERE username = $2);`;

	const params = [followerID, followedUsername];

	try {
		await pool.query(query, params);
	} catch (err) {
		console.error(err);
		throw err;
	}
};
