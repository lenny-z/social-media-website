const router = require('express').Router();
const pool = require('./pool.js').pool;

const POSTS_TABLE = process.env.POSTS_TABLE;

router.route('/').post((req, res) => {
    console.log('POST to /posts');

    const query = `INSERT INTO ${POSTS_TABLE}`;
});