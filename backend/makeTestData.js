const NUM_USERS = 20;
const NUM_ORIGINAL_POSTS = 100;
const NUM_REPLIES_PER_CALL = 100;

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

async function getUserIDs() {
	console.log('getUserIDs:');
	const query = `SELECT id FROM users;`;
	// const params = [table];
	// const res = await pool.query(query, params);
	const res = await pool.query(query);
	const ids = res.rows.map(row => row.id);
	return ids;
}

async function makePasswords() {
	console.log('makePasswords:');
	const query = `INSERT INTO salted_password_hashes(user_id,
		salted_password_hash) VALUES($1, $2);`;

	const ids = await getUserIDs();

	for (const id of ids) {
		const params = [id, crypto.randomBytes(16).toString('hex')];
		pool.query(query, params);
	}
}

const postBodies = [
	`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
	`Donec turpis velit, sollicitudin et diam nec, pretium pretium lectus.`,
	`Nam scelerisque aliquam massa, quis elementum odio.`,
	`Integer bibendum luctus placerat.`,
	`Cras enim magna, scelerisque vitae feugiat eu, lobortis in ligula.`,
	`Sed vitae pretium eros.`,
	`Cras magna mauris, lobortis id diam quis, faucibus volutpat dolor.`,
	`Praesent facilisis nisl sed libero aliquam semper.`,
	`Etiam vestibulum consectetur odio, a fringilla sem pellentesque et.`,
	`Pellentesque gravida, massa et vestibulum scelerisque, dui augue viverra quam, non auctor risus est et erat.`,
	`Etiam vestibulum iaculis velit, et pulvinar diam vulputate non.`,
	`Phasellus nec dui at turpis venenatis auctor.`,
	`Morbi in tempus est.`,
	`Aliquam cursus dui sit amet purus congue aliquam.`,
	`Nunc suscipit elit sed turpis ultricies, sit amet rutrum mi consequat.`,
	`Vivamus eu ante tempus, porttitor felis quis, ullamcorper quam.`
];

const minDate = new Date(1970, 0, 1);
const maxDate = new Date(Date.now());

function getRandomDate() {
	return myRandom(minDate.getTime(), maxDate.getTime());
}

async function makePosts() {
	console.log('makePosts:');
	const ids = await getUserIDs();

	for (var i = 0; i < NUM_ORIGINAL_POSTS; i++) {
		const id = getRandomElement(ids);
		const date = getRandomDate();
		const postBody = getRandomElement(postBodies);

		const query = `INSERT INTO posts(poster_id, body, time_posted)
			VALUES($1, $2, to_timestamp($3 / 1000.0));`;

		const params = [id, postBody, date];
		pool.query(query, params);
	}
}

async function getPostIDs() {
	console.log('getPostIDs:');
	const query = `SELECT id FROM posts;`;
	const res = await pool.query(query);
	const ids = res.rows.map(row => row.id);
	return ids;
}

async function makeReplies() {
	console.log('makeReplies:');
	const parentIDs = await getPostIDs('posts');
	const posterIDs = await getUserIDs('users');

	
	for (var i = 0; i < NUM_REPLIES_PER_CALL; i++) {
		const parentID = getRandomElement(parentIDs);
		const posterID = getRandomElement(posterIDs);
		const date = getRandomDate();
		const postBody = getRandomElement(postBodies);
		
		const query = `INSERT INTO posts(poster_id, parent_id, body, time_posted)
			VALUES($1, $2, $3, to_timestamp($4 / 1000.0));`;

		const params = [posterID, parentID, postBody, date];
		pool.query(query, params);
	}
}

async function makeTestData() {
	await clear();
	await makeUsers();
	await makePasswords();
	await makePosts();
	await makeReplies();
}

makeTestData();