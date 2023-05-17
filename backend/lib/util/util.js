const IS_DEV = process.env.NODE_ENV === 'development';

function prettyJSON(jsonObj, maxLength = null) {
	const out = JSON.stringify(jsonObj, null, '\t');

	if (typeof maxLength === 'number' && out.length > maxLength) {
		return `${out.substring(0, maxLength)} ...\n`;
	}

	return `${out}\n`;
}

exports.prettyJSON = prettyJSON;

function pretty(obj) {
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

	return str;
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