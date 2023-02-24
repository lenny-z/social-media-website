require('dotenv').config(); //state this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const app = express();
const { Client } = require('pg');

app.use(cors());
app.use(express.json());

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
});

async function userExists(username) {
    const query = 'SELECT email FROM users WHERE email = $1';
    const params = [username];

    // const onDBResponse = function (dbResponse) {
    //     return dbResponse.rowCount > 0;
    // }

    // return queryDB(credentials, query, params, onDBResponse);
    const client = new Client(credentials);
    client.connect();
    // client.query(query, params)
    // .then((res) => {
    //     // console.log(prettyJSON(res));
    //     console.log(res.rowCount);
    //     return res.rowCount > 0;
    // })
    // .catch((err) => console.error(err.stack))
    // .then(() => client.end());

    const res = await client.query(query, params);
    return res.numRows > 0;
}

app.post('/register', async (req, res) => {
    console.log('POST to /register:');
    console.log(prettyJSON(req.body));
    console.log();
    console.log(await userExists(req.body.username));

    // const query = 'SELECT email FROM users WHERE email = $1';
    // const params = [req.body.username];

    // const backendResponse = function (dbResponse) {
    //     console.log(prettyJSON(dbResponse));
    // }

    // queryDB(credentials, query, params, backendResponse)
    // console.log(userExists(req.body.username));
    // await userExists(req.body.username);
    // try {
    //     const ye = await userExists(req.body.username);
    //     console.log(await userExists(req.body.username));
    // }catch{}
});

// require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});