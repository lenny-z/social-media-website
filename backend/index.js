require('dotenv').config(); // State this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const app = express();
const util = require('./util.js');
const pool = require('./pool.js');

app.use(cors());
app.use(express.json());

// To avoid injection attacks, don't directly concatenate parameters to query
// Instead, use parameterized queries

function testConnectDB(pool) {
    const query = 'SELECT $1::text as message;';
    const params = ['DB test query successful'];

    pool.query(query, params)
        .then((res) => console.log(res.rows[0].message + '\n'))
        .catch((err) => console.error(err.stack));
}

testConnectDB(pool);

app.post('/login', (req, res) => {
    res.send('yo');
});

const registerRouter = require('./routes/register.js');

app.use('/register', registerRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}\n`);
});