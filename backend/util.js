const PRETTY_JSON_MAX_LENGTH = 256;

// export function prettyJSON(jsonObj) {
exports.prettyJSON = function (jsonObj) {
    const out = JSON.stringify(jsonObj, null, 4);

    if (out.length > PRETTY_JSON_MAX_LENGTH) {
        return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
    }

    // out += '\n';
    return out + '\n';
}