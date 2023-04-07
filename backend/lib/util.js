const PRETTY_JSON_MAX_LENGTH = 256;

exports.prettyJSON = (jsonObj) => {
	const out = JSON.stringify(jsonObj, null, 4);

	if (out.length > PRETTY_JSON_MAX_LENGTH) {
		return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
	}

	return out + '\n';
};

function indent(str, numSpaces){
	return str.replace(/^/gm, (' ').repeat(numSpaces));
}

exports.log = (log, numSpaces=0) => {
	if (process.env.NODE_ENV === process.env.NODE_DEV_ENV) {
		const out = indent(log, numSpaces);
		console.log(out);
	}
}
