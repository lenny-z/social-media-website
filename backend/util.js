const PRETTY_JSON_MAX_LENGTH = 256;

// exports.prettyJSON = function (jsonObj) {
exports.prettyJSON = (jsonObj) => {
    const out = JSON.stringify(jsonObj, null, 4);

    if (out.length > PRETTY_JSON_MAX_LENGTH) {
        return `${out.substring(0, PRETTY_JSON_MAX_LENGTH)} ...\n`;
    }

    return out + '\n';
}

// const ID_COLUMN = process.env.ID_COLUMN;
// const USERS_TABLE = process.env.USERS_TABLE;
// const EMAIL_COLUMN = process.env.EMAIL_COLUMN;
// const pool = require('./pool.js');

// exports.userExists = async (username) => {
//     console.log(`userExists(${username}):`);

//     const query = `SELECT EXISTS(SELECT ${ID_COLUMN} FROM ${USERS_TABLE} WHERE ${EMAIL_COLUMN} = $1);`;
//     console.log(`query: ${query}`)

//     const params = [username];
//     console.log(`params: ${params}`);

//     const res = await pool.query(query, params);
//     console.log(`res: ${exports.prettyJSON(res)}`);

//     return res.rows[0].exists;
// }