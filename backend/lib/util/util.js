const PRETTY_JSON_MAX_LENGTH = 256;

// exports.prettyJSON = (jsonObj, numSpaces=4) => {
function prettyJSON(jsonObj, numSpaces=4){
	const out = JSON.stringify(jsonObj, null, numSpaces);

	if (out.length > PRETTY_JSON_MAX_LENGTH) {
		return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
	}

	return out + '\n';
};

exports.prettyJSON = prettyJSON;

function indent(str, numSpaces){
	return str.replace(/^/gm, (' ').repeat(numSpaces));
}

exports.log = (log, numSpaces=0) => {
	if (process.env.NODE_ENV === 'development') {
		let outLog = '';

		if(typeof log === 'object'){
			outLog = prettyJSON(log, numSpaces);
		}else{
			outLog = log;
		}

		const out = indent(outLog, numSpaces);
		console.log(out);
	}
}
