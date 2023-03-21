require('dotenv').config(); // State this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const session = require('express-session'); // Consider Redis as session store
const crypto = require('crypto');
const queries = require('./queries.js');
const argon2 = require('argon2');
// const util = require('./util.js');

const sessionSecret = crypto.randomBytes(256).toString('hex');

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

queries.testConnect();

// To avoid injection attacks, don't directly concatenate parameters to query
// Instead, use parameterized queries

app.post('/login', async (req, res) => {
    console.log('POST to /login:');

    const userID = await queries.getUserID(req.body.username);

    if(userID === null){
        console.log('bleh');
    }else{
        const saltedPasswordHash = await queries.getSaltedPasswordHash(userID);

        if(await argon2.verify(saltedPasswordHash, req.body.password)){
            req.session.regenerate((err) => { // TODO: clean up this block
                if(err){
                    next(err);
                }

                req.session.userID = userID;
                req.session.save((err) => {
                    if(err){
                        return next(err);
                    }

                    res.redirect('/home');
                });
            });
        }
    }
});

const registerRouter = require('./routes/register.js');

app.use('/register', registerRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}\n`);
});