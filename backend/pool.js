const CREDENTIALS = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
}

const { Pool } = require('pg');
const pool = new Pool(CREDENTIALS);
// exports.pool = new Pool(CREDENTIALS);
// exports = new Pool(CREDENTIALS);
// exports = pool;
exports.query = (query, params) => {
    return pool.query(query, params)
};