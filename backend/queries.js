const ID_COLUMN = process.env.ID_COLUMN;
const USERS_TABLE = process.env.USERS_TABLE;
const EMAIL_COLUMN = process.env.EMAIL_COLUMN;
const pool = require('./pool.js');
const util = require('./util.js');

exports.testConnect = () => {
    const query = 'SELECT $1::text as message;';
    const params = ['DB test query successful'];

    pool.query(query, params)
        .then((res) => console.log(res.rows[0].message + '\n'))
        .catch((err) => console.error(err.stack));
}

exports.userExists = async (username) => {
    console.log(`userExists(${username}):`);

    const query = `SELECT EXISTS(SELECT ${ID_COLUMN} FROM ${USERS_TABLE} WHERE ${EMAIL_COLUMN} = $1);`;
    console.log(`query: ${query}`)

    const params = [username];
    console.log(`params: ${params}`);

    const res = await pool.query(query, params);
    // console.log(`res: ${exports.prettyJSON(res)}`);
    console.log(`res: ${util.prettyJSON(res)}`);

    return res.rows[0].exists;
}