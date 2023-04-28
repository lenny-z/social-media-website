const PRETTY_JSON_MAX_LENGTH = 256;

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
	if (process.env.NODE_ENV === 'development') {
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

		// const out = indent(outLog, numTabs);
		if (numTabs > 0) {
			outLog = indent(outLog, numTabs);
		}
		// console.log(out);
		// console.log(outLog);
		return outLog;
	}
}

// function llog(label, unlabeledLog, numTabs = 0) { // Labeled log
// process.stdout.write(`${label}: `);
// console.log(`${label}: ${log(unlabeledLog, numTabs)}`);
// logHelper(unlabeledLog, numTabs);
// }

// exports.log = logHelper;
// exports.llog = llog;

exports.log = (log, numTabs = 0) => {
	console.log(logHelper(log, numTabs));
};

// Labeled log:
exports.llog = (label, log, numTabs = 0) => {
	console.log(logHelper(`${label}: ${logHelper(log)}`, numTabs));
};