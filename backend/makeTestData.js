const NUM_USERS = 20;
const NUM_POSTS = 100;

const pool = require('./lib/pool.js');
const crypto = require('crypto');

async function clear() {
	console.log('clear:');
	pool.query('DELETE FROM users;');
	pool.query('DELETE FROM salted_password_hashes;');
	pool.query('DELETE FROM posts;');
	pool.query('DELETE FROM follows;');
}

const firstNames = [
	'Liam', 'Noah', 'Olive', 'Eli', 'Jim', 'Will', 'Ben', 'Luke', 'Henry',
	'Theo', 'Jack', 'Levi', 'Alex', 'Matt', 'Dan', 'Mike', 'Mason', 'Seb',
	'Ethan', 'Emma', 'Charlie', 'Ava', 'Sophie', 'Izzy', 'Mia', 'Ev', 'Harper',
	'Luna', 'Camila', 'Gianna', 'Elly', 'Abby', 'Avery', 'Scarlet'
];

const lastNames = [
	'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
	'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
	'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

const emailProviders = [
	'gmail.com', 'yahoo.com', 'hotmail.com', 'verizon.com'
];

function myRandom(min, max) {
	return min + Math.floor(Math.random() * (max - min))
}

function getRandomElement(array) {
	// return array[Math.floor(Math.random() * array.length)];
	return array[myRandom(0, array.length)];
}

const usernames = [];

async function makeUsers() {
	console.log('makeUsers:');
	let numUsers = 0;
	const query = 'INSERT INTO users(email, username) VALUES ($1, $2);';

	while (numUsers < NUM_USERS) {
		const firstName = getRandomElement(firstNames);
		const lastName = getRandomElement(lastNames);
		const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
		const emailProvider = getRandomElement(emailProviders);
		const email = `${username}@${emailProvider}`;
		const params = [email, username];

		try {
			await pool.query(query, params);
			usernames.push(username);
			numUsers++;
		} catch (err) { }
	}
}

async function makePasswords() {
	console.log('makePasswords:');
	const query = `INSERT INTO salted_password_hashes(user_id,
		salted_password_hash) VALUES((SELECT id FROM users WHERE username
		= $1), $2);`;

	for (const username of usernames) {
		const params = [username, crypto.randomBytes(16).toString('hex')];
		pool.query(query, params);
	}
}

const posts = [
	`bruh what is this weather`,
	`did yall see that ludicrous display last night`,
	`Database management, never again.`,
	`What opinion has got you like this?`,
	`fresh cut fr`,
	`Stream tonight at 9 EST!`,
	`Love all y'all who met up w/ me at the con last night!`,
	`Web dev looking for work, resume in bio. DM me!`,
	`Looking for videographer, pay will be on a per-video basis. DM me :D`,
	`fuck it we ball`,
	`how do some people just write regex. how do you live life like that`,
	`Sports Team will never reclaim its glory unless it replaces Coachie McCoachface`,
];

const minDate = new Date(1970, 0, 1);
const maxDate = new Date(Date.now());


async function makePosts() {
	console.log('makePosts:');

	for (var i = 0; i < NUM_POSTS; i++) {
		const username = getRandomElement(usernames);
		const date = myRandom(minDate.getTime(), maxDate.getTime());
		const post = getRandomElement(posts);

		const query = `INSERT INTO posts(poster_id, body, time_posted)
			VALUES((SELECT id FROM users WHERE username = $1),
			$2, to_timestamp($3 / 1000.0));`;

		const params = [username, post, date];
		pool.query(query, params);
	}
}

async function makeTestData() {
	await clear();
	await makeUsers();
	await makePasswords();
	await makePosts();
}

makeTestData();