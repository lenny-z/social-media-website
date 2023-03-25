const router = require('express').Router();
const pool = require('../pool.js');
const queries = require('../queries.js');
// const util = require('../util.js');

const USERS_TABLE = process.env.USERS_TABLE;
const ID_COLUMN = process.env.ID_COLUMN; // Assumes that all serial primary key columns share the same name
const EMAIL_COLUMN = process.env.EMAIL_COLUMN;

const argon2 = require('argon2');
const SALTED_PASSWORD_HASHES_TABLE = process.env.SALTED_PASSWORD_HASHES_TABLE;
const SALTED_PASSWORD_HASH_COLUMN = process.env.SALTED_PASSWORD_HASH_COLUMN;
const USER_ID_COLUMN = process.env.USER_ID_COLUMN;

router.post('/', async (req, res) => {
    console.log('POST to /register:');

    if (await queries.userExists(req.body.username)) {
        res.sendStatus(409); // 409 Conflict
    } else {
        const client = await pool.connect();

        try {
            await client.query('BEGIN;');

            var query = `INSERT INTO ${USERS_TABLE}(${EMAIL_COLUMN}) VALUES ($1);`;
            var params = [req.body.username];
            await client.query(query, params);

            const salted_password_hash = await argon2.hash(req.body.password);
            query = `INSERT INTO ${SALTED_PASSWORD_HASHES_TABLE}(${USER_ID_COLUMN}, ${SALTED_PASSWORD_HASH_COLUMN}) VALUES
            ((SELECT ${ID_COLUMN} FROM ${USERS_TABLE} WHERE ${EMAIL_COLUMN} = $1), $2);`;
            params = [req.body.username, salted_password_hash];
            await client.query(query, params);

            await client.query('COMMIT;');
            res.sendStatus(201); // 201 Created
        } catch (err) {
            await client.query('ROLLBACK;');
            console.error(err);
            res.sendStatus(500); // 500 Internal Server Error
        } finally {
            client.release();
        }
    }
});

module.exports = router;