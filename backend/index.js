require('dotenv').config(); //state this as early as possible to read .env files
const express = require('express');
const cors = require('cors');
const app = express();
const { Client } = require('pg');
// const { Pool } = require('pg');

app.use(cors());
app.use(express.json());

//TODO: get a backend response working first
//TODO: use pools instead of clients
//TODO: actually use clients instead of pools in order to support transactions
// const client = new Client({
// const pool = new Pool({
const credentials = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
    // });
}

// function testConnectDB(client) {
// function testConnectDB(pool) {
function testConnectDB(credentials) {
    const client = new Client(credentials);
    client.connect()
        // pool.connect()
        .then(() => console.log('Connected to PG database'))
        .catch((err) => console.error(err.stack));

    const query = 'SELECT $1::text as message';
    // const params = ['Queried PG database'];
    const params = ['PG test query successful'];

    client.query(query, params)
        // pool.query(query, params)
        .then((res) => console.log(res.rows[0].message))
        .catch((err) => console.error(err.stack))
        .then(() => client.end());
}

// testConnectDB(client);
// testConnectDB(pool);
testConnectDB(credentials);

function prettyJSON(jsonObj) {
    return JSON.stringify(jsonObj, null, 4);
}

app.post('/login', (req, res) => {
    console.log('POST to /login:');
    // console.log(JSON.stringify(req.body, null, 4));
    console.log(prettyJSON(req.body));
    console.log();
    res.send('yo');
});

app.post('/register', (req, res) => {
    console.log('POST to /register:');
    // console.log(JSON.stringify(req.body, null, 4));
    console.log(prettyJSON(req.body));
    console.log();

    const client = new Client(credentials);
    client.connect(); //one connect/disconnect per query
    //to avoid injection attacks, don't directly concatenate parameters to query
    //instead, use parameterized queries
    const query = 'SELECT email FROM users WHERE email = $1';
    const params = [req.body.username];
    client.query(query, params, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            // console.log(res.rows[0]);
            console.log(prettyJSON(res))
        }
    });
});

// require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});