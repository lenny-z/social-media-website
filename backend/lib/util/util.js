const PRETTY_JSON_MAX_LENGTH = 256;

function prettyJSON(jsonObj, numSpaces = 4) {
	const out = JSON.stringify(jsonObj, null, numSpaces);

	if (out.length > PRETTY_JSON_MAX_LENGTH) {
		return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
	}

	return out + '\n';
};

exports.prettyJSON = prettyJSON;

function indent(str, numSpaces) {
	return str.replace(/^/gm, (' ').repeat(numSpaces));
}

exports.log = (log, numSpaces = 0) => {
	if (process.env.NODE_ENV === 'development') {
		let outLog = '';

		// switch(typeof log){
		// 	case 'undefined':
		// 		outLog = 'UNDEFINED';
		// 		break;

		// 	case 'object':
		// 		if(log === null){
		// 			outLog = 'NULL';
		// 		}else{
		// 			outLog = prettyJSON(log, 4);
		// 		}

		// 		break;

		// 	cas
		// }

		const out = indent(outLog, numSpaces);
		console.log(out);
	}
}
