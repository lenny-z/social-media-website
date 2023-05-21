// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

// import * as pg from 'pg';
import pg from 'pg';
const { Pool } = pg;

const CREDENTIALS = {
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
};

// const { Pool } = require('pg');
// module.exports = new Pool(CREDENTIALS);
const pool = new Pool(CREDENTIALS);
// export default pool = new Pool(CREDENTIALS);
export default pool;