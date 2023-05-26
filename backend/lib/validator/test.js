import * as validator from './validator.js';
import util from '@lenny_zhou/util';

async function runTest() {
	console.log('runTest');
	const email = process.argv[2];
	const username = process.argv[3];
	const emailValidation = await validator.email(email);
	const emailIsValid = validator.allReqsMet(emailValidation);
	const usernameValidation = await validator.username(username);
	const usernameIsValid = validator.allReqsMet(usernameValidation);
	console.log(`emailRegex: ${validator.emailRegex}`);
	console.log(`email: ${util.pretty(email)}`);
	console.log(`emailValidation: ${util.pretty(emailValidation)}`);
	console.log(`emailIsValid: ${emailIsValid}`);
	console.log(`username: ${util.pretty(username)}`);
	console.log(`usernameValidation: ${util.pretty(usernameValidation)}`);
	console.log(`usernameIsValid: ${usernameIsValid}`);
	return;
}

runTest();