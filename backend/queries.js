const USERS_TABLE = process.env.USERS_TABLE;
const SALTED_PASSWORD_HASHES_TABLE = process.env.SALTED_PASSWORD_HASHES_TABLE;

const ID_COLUMN = process.env.ID_COLUMN;
const USER_ID_COLUMN = process.env.USER_ID_COLUMN;

const EMAIL_COLUMN = process.env.EMAIL_COLUMN;
const SALTED_PASSWORD_HASH_COLUMN = process.env.SALTED_PASSWORD_HASH_COLUMN;

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
        console.log(`${res.rows[0].message}\n`);
    } catch (err) {
        console.error(err.stack);
    }
};

exports.getUserID = async (email) => {
    console.log(`getUserID(${email}):`);

    const query = `SELECT ${ID_COLUMN} FROM ${USERS_TABLE} WHERE ${EMAIL_COLUMN} = $1;`;
    console.log(`query: ${query}`);

    const params = [email];
    console.log(`params: ${params}`);

    try {
        const res = await pool.query(query, params);
        console.log(`res: ${util.prettyJSON(res)}`);

        if (res.rowCount === 0) {
            return null;
        } else {
            return res.rows[0][ID_COLUMN];
        }
    } catch (err) {
        console.error(err.stack);
        return null;
    }

}

// Don't log passwords

exports.getSaltedPasswordHash = async (userID) => {
    const query = `SELECT ${SALTED_PASSWORD_HASH_COLUMN} FROM ${SALTED_PASSWORD_HASHES_TABLE}
    WHERE ${USER_ID_COLUMN} = $1;`;

    const params = [userID];

    try {
        const res = await pool.query(query, params);
        return res.rows[0][SALTED_PASSWORD_HASH_COLUMN];
    } catch (err) {
        return null;
    }
}