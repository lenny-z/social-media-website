const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const usernameCharsRegex = /^[a-zA-Z0-9_-]*$/;

// exports.allReqsMet = (reqs) => {
// 	const keys = Object.keys(reqs);

// 	for (const req of keys) {
// 		if (reqs[req] !== true) {
// 			return false;
// 		}
// 	}

// 	return true;
// };

//Requirements met and not met
exports.reqsMet = (reqs) => {
	const keys = Object.keys(reqs);
	const met = [];
	const notMet = [];

	for (const req of keys) {
		if (reqs[req] === true) {
			met.push(req);
		} else {
			notMet.push(req);
		}
	}

	return {
		met: met,
		notMet: notMet
	}
};

exports.allReqsMet = (reqsMet) => {
	const notMet = reqsMet.notMet;
	return Array.isArray(notMet) && notMet.length === 0;
}

exports.email = (email) => {
	const reqs = {
		isValid: emailRegex.test(email)
	}

	return reqs;
	// return emailRegex.test(email);
};

exports.username = (username) => {
	const protectedNames = [
		'login',
		'register',
		'search',
		'settings'
	];

	const reqs = {
		isString: false,
		notProtected: false,
		lengthAtLeast1: false,
		lengthAtMost32: false,
		allowedCharsOnly: false
	};

	if (typeof username === 'string') {
		reqs.isString = true;
	} else {
		return reqs;
	}

	if (protectedNames.includes(username.toLowerCase()) === false) {
		reqs.notProtected = true;
	}

	if (username.length >= 1) {
		reqs.lengthAtLeast1 = true;
	}

	if (username.length <= 32) {
		reqs.lengthAtMost32 = true;
	}

	if (usernameCharsRegex.test(username) === true) {
		reqs.allowedCharsOnly = true;
	}

	return reqs;
};

exports.password = (password) => {
	const reqs = {
		isString: false,
		lengthAtLeast14: false,
		lengthAtMost128: false,
	}

	if (typeof password === 'string') {
		reqs.isString = true;
	} else {
		return reqs;
	}

	if (password.length >= 14) {
		reqs.lengthAtLeast14 = true;
	}

	if (password.length <= 128) {
		reqs.lengthAtMost128 = true;
	}

	return reqs;
}