const ID_COLUMN = process.env.ID_COLUMN;
const USERS_TABLE = process.env.USERS_TABLE;
const EMAIL_COLUMN = process.env.EMAIL_COLUMN;
const pool = require('./pool.js');
const util = require('./util.js');

// To avoid injection attacks, don't directly concatenate parameters to query
// Instead, use parameterized queries

exports.testConnect = async () => {
    console.log('testConnect():');

    const query = 'SELECT $1::text as message;';
    const params = ['DB test query successful'];

    try {
        const res = await pool.query(query, params);
        console.log(res.rows[0].message + '\n');
    } catch (err) {
        console.error(err.stack);
    }
    // .then((res) => console.log(res.rows[0].message + '\n'))
    // .catch((err) => console.error(err.stack));
};

// exports.userExists = async (username) => {
//     console.log(`userExists(${username}):`);

//     const query = `SELECT EXISTS(SELECT ${ID_COLUMN} FROM ${USERS_TABLE} WHERE ${EMAIL_COLUMN} = $1);`;
//     console.log(`query: ${query}`)

//     const params = [username];
//     console.log(`params: ${params}`);

//     const res = await pool.query(query, params);
//     // console.log(`res: ${exports.prettyJSON(res)}`);
//     console.log(`res: ${util.prettyJSON(res)}`);

//     return res.rows[0].exists;
// };

exports.getUserID = async (email) => {
    console.log(`getUserID(${email}):`);

    const query = `SELECT ${ID_COLUMN} FROM ${USERS_TABLE} WHERE ${EMAIL_COLUMN} = $1;`;
    console.log(`query: ${query}`);

    const params = [email];
    console.log(`params: ${params}`);

    const res = await pool.query(query, params);
    console.log(`res: ${util.prettyJSON(res)}`);

    if (res.rowCount == 0) {
        return null;
    } else {
        return res.rows[0].id;
    }
}

exports.getSaltedPasswordHash = async (username) => {
    const query = `SELECT ${SALTED_PASSWORD_HASH_COLUMN} FROM ${SALTED_PASSWORD_HASHES_TABLE}
    WHERE ${USER_ID} = (SELECT ${ID_})`
};