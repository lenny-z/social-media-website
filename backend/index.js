require('dotenv').config(); //state this as early as possible to read .env files
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

// client.connect((err) => {
//     if (err) {
//         console.log(err.stack);
//     } else {
//         console.log('Connected to PG database');
//     }
// });

function testConnectDB(client) {
    client.connect()
        .then(() => console.log('Connected to PG database'))
        .catch((err) => console.error(err.stack));

    const query = 'SELECT $1::text as message';
    const params = ['Queried PG database'];

    client.query(query, params)
        .then((res) => console.log(res.rows[0].message))
        .catch((err) => console.error(err.stack))
        .then(() => client.end());
}
// client.connect();
// client.query('SELECT NOW()')
//     .then(res => console.log(res))
//     .catch(err => console.error(err.stack))
//     .then(() => client.end());
testConnectDB(client);
// client.query('SELECT $1::text as message', ['Queried PG database'], (err, res) => {
//     if (err) {
//         console.log(err.stack);
//     } else {
//         console.log(res.rows[0].message);
//     }
//     console.log();
//     client.end();
// });

app.post('/login', (req, res) => {
    console.log('POST to /login:');
    console.log(JSON.stringify(req.body, null, 4));
    console.log();
    res.send('yo');
});

app.post('/register', (req, res) => {
    console.log('POST to /register:');
    console.log(JSON.stringify(req.body, null, 4));
    console.log();

    client.connect(); //one connect/disconnect per query
    //to avoid injection attacks, don't directly concatenate parameters to query
    //instead, use parameterized queries
    const query = 'SELECT email FROM users WHERE email = VALUES($1)';
    const params = [req.body.username];
    client.query(query, params, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows[0]);
        }
    });
});



require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});