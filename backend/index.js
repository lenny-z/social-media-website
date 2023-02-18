require('dotenv').config();         //state this as early as possible to read .env files
const express = require('express');
const cors = require('cors');
const app = express();
const { Client } = require('pg');

app.use(cors());
app.use(express.json());

// const pgUser = process.env.PGUSER;
// console.log(pgUser);
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});
// console.log(process.env.PGUSER);
// client.connect();
// client
//     .connect()
//     .then(() => console.log('Connected to PostgreSQL database'))
//     // .catch((err) => console.error('Error: did not connect to PostgreSQL database'));
//     .catch((err) => console.log(err.stack));
// const res = await client.query('SELECT $1::TEXT AS MESSAGE', ['Hello, world!']);
// console.log(res.rows[0].message);
// await client.end();
client.connect((err) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

// client.query('SELECT $1::text as message', ['Connected to PostgreSQL database'], (err, res) => {
//     console.log(err ? err.stack : res.rows[0].message);
//     client.end();
// });

app.post('/login', (req, res) => {
    console.log(JSON.stringify(req.body, null, 4));
    res.send('yo');
});

require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});