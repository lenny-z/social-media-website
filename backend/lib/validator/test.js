const validator = require('./validator.js');
const util = require('@lenny_zhou/util');

async function runTest() {
	const username = process.argv[2];
	const usernameValidation = await validator.username(username);
	const usernameIsValid = validator.allReqsMet(usernameValidation);
	// const reqsMet = validator.reqsMet(validator.username(username));
	// const allReqsMet = validator.allReqsMet(reqsMet);
	console.log(`username: ${util.pretty(username)}`)
	// console.log(`reqsMet: ${util.pretty(reqsMet)}`);
	console.log(`usernameValidation: ${util.pretty(usernameValidation)}`);
	// console.log(`allReqsMet: ${allReqsMet}`)
	console.log(`usernameIsValid: ${usernameIsValid}`);
	return;
}

runTest();