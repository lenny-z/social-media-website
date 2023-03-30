const PRETTY_JSON_MAX_LENGTH = 256;

exports.prettyJSON = (jsonObj) => {
	const out = JSON.stringify(jsonObj, null, 4);

	if (out.length > PRETTY_JSON_MAX_LENGTH) {
		return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
	}

	return out + '\n';
}

exports.devLog = (log) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(log);
	}
}

// exports.indent = (string, numSpaces) => {
// 	return string.replace(/^/gm, (' ').repeat(numSpaces));
// }