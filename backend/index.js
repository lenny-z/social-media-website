const express = require('express');
const cors = require('cors');
const app = express();
const { Client } = require('pg');

app.use(cors());
app.use(express.json());

//PG test
const client = new Client();
client.connect();
// const res = await client.query('SELECT $1::TEXT AS MESSAGE', ['Hello, world!']);
// console.log(res.rows[0].message);
// await client.end();
client.query('SELECT $1::text as message', ['Hello, world!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message);
    client.end();
});

app.post('/login', (req, res) => {
    console.log(JSON.stringify(req.body, null, 4));
    res.send('yo');
});

require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});