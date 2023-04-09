const NUM_USERS = 20;

const pool = require('./lib/pool.js');
const crypto = require('crypto');

async function clear() {
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

function getRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

const usernames = [];

async function makeUsers() {
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

async function makePasswords(){
	const query = `INSERT INTO salted_password_hashes(user_id,
		salted_password_hash) VALUES((SELECT id FROM users WHERE username
		= $1), $2);`;

	for(const username of usernames){
		const params = [username, crypto.randomBytes(16).toString('hex')];
		pool.query(query, params);
	}
}

async function makeTestData() {
	await clear();
	await makeUsers();
	await makePasswords();
}

makeTestData();