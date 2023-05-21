import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const CREDENTIALS = {
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
};

const pool = new Pool(CREDENTIALS);
export default pool;