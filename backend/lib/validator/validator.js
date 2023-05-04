const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const usernameCharsRegex = /^[a-zA-Z0-9_-]*$/;

exports.email = (email) => {
	return emailRegex.test(email);
};

exports.username = (username) => {
	const requirements = {
		isString: false,
		lengthAtLeast1: false,
		lengthAtMost32: false,
		allowedCharactersOnly: false
	}

	if (typeof username === 'string') {
		requirements.isString = true;
	} else {
		return requirements;
	}

	if (username.length >= 1) {
		requirements.lengthAtLeast1 = true;
	}

	if (username.length <= 32) {
		requirements.lengthAtMost32 = true;
	}

	if (usernameCharsRegex.test(username) === true) {
		requirements.allowedCharactersOnly = true;
	}

	return requirements;
};

exports.password = (password) => {
	const requirements = {
		isString: false,
		lengthAtLeast14: false,
		lengthAtMost128: false,
	}

	if (typeof password === 'string') {
		requirements.isString = true;
	} else {
		return requirements;
	}

	if (username.length >= 14) {
		requirements.lengthAtLeast14 = true;
	}

	if (username.length <= 128) {
		requirements.lengthAtMost128 = true;
	}

	return requirements;
}