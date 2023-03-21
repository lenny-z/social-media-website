require('dotenv').config(); // State this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const session = require('express-session'); // Consider Redis as session store
const crypto = require('crypto');
const queries = require('./queries.js');
const util = require('./util.js');

// const pool = require('./pool.js');

const sessionSecret = crypto.randomBytes(256);

const sessionOptions = {
    secret: sessionSecret,
    resave: true, // Enable only for session stores that don't support 'touch' command
    saveUninitialized: true,
    cookie: {}
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(session(sessionOptions));

// To avoid injection attacks, don't directly concatenate parameters to query
// Instead, use parameterized queries

// function testConnectDB(pool) {
    // const query = 'SELECT $1::text as message;';
    // const params = ['DB test query successful'];

    // pool.query(query, params)
    //     .then((res) => console.log(res.rows[0].message + '\n'))
    //     .catch((err) => console.error(err.stack));
// }

// testConnectDB(pool);
queries.testConnect();

app.post('/login', async (req, res) => {
    // res.send('yo');
    console.log('POST to /login:');

    if (await util.userExists(req.body.username)){
        // if()
    }
});

const registerRouter = require('./routes/register.js');

app.use('/register', registerRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}\n`);
});