require('dotenv').config(); //state this as early as possible to read .env files
const express = require('express');
const cors = require('cors');
const app = express();
const { Client } = require('pg');

app.use(cors());
app.use(express.json());

//TODO: get a backend response working first
//TODO: use clients instead of pools in order to support transactions
const credentials = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
}

function testConnectDB(credentials) {
    const client = new Client(credentials);

    client.connect()
        .then(() => console.log('DB test connection successful'))
        .catch((err) => console.error(err.stack));

    const query = 'SELECT $1::text as message';
    const params = ['DB test query successful'];

    client.query(query, params)
        .then((res) => console.log(res.rows[0].message))
        .catch((err) => console.error(err.stack))
        .then(() => client.end());

}

testConnectDB(credentials);

function prettyJSON(jsonObj) {
    return JSON.stringify(jsonObj, null, 4);
}

//one connect/disconnect per query
//to avoid injection attacks, don't directly concatenate parameters to query
//instead, use parameterized queries
function queryDB(credentials, myQuery, myParams, backendResponse) {
    const client = new Client(credentials);
    client.connect();
    client.query(myQuery, myParams)
        .then((res) => backendResponse(res))
        .catch((err) => console.error(err.stack))
        .then(() => client.end());
}

app.post('/login', (req, res) => {
    console.log('POST to /login:');
    console.log(prettyJSON(req.body));
    console.log();
    res.send('yo');
    // const apiResponse = function(dbResponse){

    // }
});

app.post('/register', (req, res) => {
    console.log('POST to /register:');
    console.log(prettyJSON(req.body));
    console.log();

    // const client = new Client(credentials);
    // client.connect();
    const query = 'SELECT email FROM users WHERE email = $1';
    const params = [req.body.username];
    const backendResponse = function (dbResponse) {
        // console.log(prettyJSON(dbResponse.rows[0]));
        console.log(prettyJSON(dbResponse));
    }
    // client.query(query, params, (err, res) => {
    //     if (err) {
    //         console.log(err.stack);
    //     } else {
    //         // console.log(res.rows[0]);
    //         console.log(prettyJSON(res))
    //     }
    // });
    queryDB(credentials, query, params, backendResponse)
});

// require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});