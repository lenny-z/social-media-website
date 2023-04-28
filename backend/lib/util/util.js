const PRETTY_JSON_MAX_LENGTH = 256;
const IS_DEV = process.env.NODE_ENV === 'development';

function prettyJSON(jsonObj) {
	const out = JSON.stringify(jsonObj, null, '\t');

	if (out.length > PRETTY_JSON_MAX_LENGTH) {
		return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
	}

	return out + '\n';
};

exports.prettyJSON = prettyJSON;

function indent(str, numTabs) {
	return str.replace(/^/gm, ('\t').repeat(numTabs));
}

function logHelper(log, numTabs = 0) {
	if (IS_DEV) {
		let outLog = '';

		switch (typeof log) {
			case 'undefined':
				outLog = 'UNDEFINED';
				break;

			case 'object':
				if (log === null) {
					outLog = 'NULL';
				} else {
					outLog = prettyJSON(log);
				}

				break;

			case 'boolean':
				outLog = log.toString();
				break;

			case 'number':
				outLog = log.toString();
				break;

			case 'string':
				outLog = log;
				break;

			case 'function':
				outLog = log.toString();
				break;

			default:
				outLog = prettyJSON(log);
		}

		if (numTabs > 0) {
			outLog = indent(outLog, numTabs);
		}
		return outLog;
	}
}

exports.log = (log, numTabs = 0) => {
	if (IS_DEV) {
		console.log(logHelper(log, numTabs));
	}
};

// Labeled log:
exports.llog = (label, log, numTabs = 0) => {
	if (IS_DEV) {
		console.log(logHelper(`${label}: ${logHelper(log)}`, numTabs));
	}
};