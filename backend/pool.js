const CREDENTIALS = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
}

const { Pool } = require('pg');
const pool = new Pool(CREDENTIALS);

exports.connect = () => {
    return pool.connect();
}

exports.query = (query, params) => {
    return pool.query(query, params)
};