const PRETTY_JSON_MAX_LENGTH = 256;
const IS_DEV = process.env.NODE_ENV === 'development';

function prettyJSON(jsonObj) {
	const out = JSON.stringify(jsonObj, null, '\t');

	if (out.length > PRETTY_JSON_MAX_LENGTH) {
		return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
	}

	// return out + '\n';
	return `${out}\n`;
}

exports.prettyJSON = prettyJSON;

// function indent(str, numTabs) {
// 	return str.replace(/^/gm, ('\t').repeat(numTabs));
// }

function pretty(obj) {
	// if (IS_DEV) {
	let str = '';

	switch (typeof obj) {
		case 'undefined':
			str = 'UNDEFINED';
			break;

		case 'object':
			if (obj === null) {
				str = 'NULL';
			} else {
				str = prettyJSON(obj);
			}

			break;

		case 'boolean':
			str = obj.toString();
			break;

		case 'number':
			str = obj.toString();
			break;

		case 'string':
			str = obj;
			break;

		case 'function':
			str = obj.toString();
			break;

		default:
			str = prettyJSON(obj);
	}

	// if (numTabs > 0) {
	// 	outStr = indent(outStr, numTabs);
	// }
	return str;
	// }
}

exports.pretty = pretty;

exports.log = (log, numTabs = 0) => {
	if (IS_DEV) {
		console.log(pretty(log, numTabs));
	}
};

// Labeled log:
exports.llog = (label, log, numTabs = 0) => {
	if (IS_DEV) {
		console.log(pretty(`${label}: ${pretty(log)}`, numTabs));
	}
};