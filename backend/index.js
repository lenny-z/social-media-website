require('dotenv').config(); //state this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const CREDENTIALS = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
}

const { Pool } = require('pg');
const pool = new Pool(CREDENTIALS);

//To avoid injection attacks, don't directly concatenate parameters to query
//Instead, use parameterized queries

function testConnectDB(pool) {
    const query = 'SELECT $1::text as message;';
    const params = ['DB test query successful'];

    pool.query(query, params)
        .then((res) => console.log(res.rows[0].message))
        .catch((err) => console.error(err.stack));
}

testConnectDB(pool);

function prettyJSON(jsonObj) {
    const out = JSON.stringify(jsonObj, null, 4);

    if (out.length > 256) {
        return `${out.substring(0, 256)} ...`;
    }

    // return JSON.stringify(jsonObj, null, 4).substring(0, 256);
    return out;
}

//Don't log passwords
app.post('/login', (req, res) => {
    // console.log('POST to /login:');
    // console.log(prettyJSON(req.body));
    // console.log();
    res.send('yo');
});

const USERS_TABLE = process.env.USERS_TABLE;
const EMAIL_COLUMN = process.env.EMAIL_COLUMN;

async function getUser(username, pool) {
    console.log(`getUser(${username}, pool):`);

    const query = `SELECT ${EMAIL_COLUMN} FROM ${USERS_TABLE} WHERE ${EMAIL_COLUMN} = $1;`;
    console.log(`query: ${query}`)

    const params = [username];
    console.log(`params: ${params}`);

    const res = await pool.query(query, params);
    console.log(`res: ${prettyJSON(res)}`);

    return res;
}

//https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
//By default, argon2id hash stores its own salt
const argon2 = require('argon2');
const SALTED_PASSWORD_HASHES_TABLE = process.env.SALTED_PASSWORD_HASHES_TABLE;
const SALTED_PASSWORD_HASH_COLUMN = process.env.SALTED_PASSWORD_HASH_COLUMN;

app.post('/register', async (req, res) => {
    console.log('POST to /register:');
    // console.log(`req.body: ${prettyJSON(req.body)}`);
    const user = await getUser(req.body.username, pool);
    console.log(prettyJSON(user));

    if (user.rowCount > 0) {
        res.sendStatus(409);
    } else {
        // const query = `BEGIN; INSERT INTO ${USERS_TABLE}(${USERNAME_COLUMN}) VALUES ($1); COMMIT;`;
        // const password_hash_salt = await argon2.hash(req.body.password);
        // const params = [req.body.username, password_hash_salt];
        // const params = [req.body.username];
        // const client = new Client(CREDENTIALS);
        // const client = new Client(CREDENTIALS);
        // await client.connect();
        const client = await pool.connect();
        try {
            await client.query('BEGIN;');
            var query = `INSERT INTO ${USERS_TABLE}(${EMAIL_COLUMN}) VALUES ($1);`;
            var params = [req.body.username];
            await client.query(query, params);
            // const salted_password_hash = await argon2.hash(req.body.password);
            // query = `INSERT INTO ${SALTED_PASSWORD_HASHES_TABLE}(${USER_ID_COLUMN}, ${SALTED_PASSWORD_HASH_COLUMN})
            // VALUES(${user.})`

            // query = `INSERT INTO ${SALTED_PASSWORD_HASHES_TABLE}()`;
            await client.query('COMMIT;');
        } catch (err) {
            await client.query('ROLLBACK;');
            console.error(err);
        } finally {
            // client.end();
            client.release();
        }
    }
});

const port = process.env.PORT;

app.listen(port, () => {
    // console.log('Server running on port ' + port);
    console.log(`Server running on port ${port}`);
});