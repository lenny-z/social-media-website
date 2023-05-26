import * as validator from './validator.js';
import util from '@lenny_zhou/util';

async function testField(field, fieldValue, fieldValidator) {
	console.log(`Field: ${field}`);
	console.log(`Field value: ${util.pretty(fieldValue)}`);
	const validation = await fieldValidator(fieldValue);
	// console.log(`Validation: ${util.pretty(fieldValidator(fieldValue))}`);
	console.log(`Validation: ${util.pretty(validation)}`);
	console.log(`Is valid: ${validator.allReqsMet(validation)}`);
}

async function runTest() {
	// console.log('runTest');
	const flag = process.argv[2];

	switch (flag) {
		case '-e': // Email
			console.log(`emailRegex: ${validator.emailRegex}`);
			// const email = process.argv[3];
			// const emailValidation = await validator.email(email);
			// const emailIsValid = validator.allReqsMet(emailValidation);
			// console.log(`email: ${util.pretty(email)}`);
			// console.log(`emailValidation: ${util.pretty(emailValidation)}`);
			// console.log(`emailIsValid: ${emailIsValid}`);
			await testField('email', process.argv[3], validator.email);
			break;

		case '-u': // Username
			// const username = process.argv[3];
			// const usernameValidation = await validator.username(username);
			// const usernameIsValid = validator.allReqsMet(usernameValidation);
			// console.log(`username: ${util.pretty(username)}`);
			// console.log(`usernameValidation: ${util.pretty(usernameValidation)}`);
			// console.log(`usernameIsValid: ${usernameIsValid}`);
			await testField('username', process.argv[3], validator.username);
			break;

		case '-p': // Post
			// const post = process
			await testField('post', process.argv[3], validator.post);
			break;

		default:
			console.log('No valid field flag provided.');
			break;
	}

	// const email = process.argv[2];
	return;
}

runTest();