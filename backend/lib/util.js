const PRETTY_JSON_MAX_LENGTH = 256;

exports.prettyJSON = (jsonObj) => {
	const out = JSON.stringify(jsonObj, null, 4);

	if (out.length > PRETTY_JSON_MAX_LENGTH) {
		return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
	}

	return out + '\n';
};

// exports.setIndent

exports.log = (log) => {
	// if (process.env.NODE_ENV === 'development') {
	if (process.env.NODE_ENV === process.env.NODE_DEV_ENV) {
		console.log(log);
	}
}
