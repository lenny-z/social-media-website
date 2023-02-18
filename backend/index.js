require('dotenv').config();         //state this as early as possible to read .env files
const express = require('express');
const cors = require('cors');
const app = express();
const { Client } = require('pg');

app.use(cors());
app.use(express.json());

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

client.connect((err) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

client.query('SELECT $1::text as message', ['Test query successful'], (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log(res.rows[0].message);
    }
});
//     client.end();

app.post('/login', (req, res) => {
    console.log(JSON.stringify(req.body, null, 4));
    res.send('yo');
});

require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});