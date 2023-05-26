import * as validator from './validator.js';
import util from '@lenny_zhou/util';
import fs from 'fs';

async function testField(field, fieldValue, fieldValidator, echoValue = true) {
	console.log(`Field: ${field}`);

	if (echoValue === true) {
		console.log(`Field value: ${util.pretty(fieldValue)}`);
	}

	const validation = await fieldValidator(fieldValue);
	console.log(`Validation: ${util.pretty(validation)}`);
	console.log(`Is valid: ${validator.allReqsMet(validation)}`);
}

async function runTest() {
	const flag = process.argv[2];

	switch (flag) {
		case '-e': // Email
			console.log(`emailRegex: ${validator.emailRegex}`);
			await testField('email', process.argv[3], validator.email);
			break;

		case '-u': // Username
			await testField('username', process.argv[3], validator.username);
			break;

		case '-p': // Post
			await testField('post', process.argv[3], validator.post);
			break;

		case '-p[lorem-ipsum]': // Post with lorem ipsum body
			fs.readFile('./lorem-ipsum.txt', 'utf8', async (err, body) => {
				if (err) {
					console.error(err);
				} else {
					await testField('post', body, validator.post, false);
				}
			})

			break;

		default:
			console.log('No valid field flag provided.');
			break;
	}

	return;
}

runTest();