// require('dotenv').config(); // State this as early as possible to read .env files
import dotenv from 'dotenv';
dotenv.config(); // State this as early as possible to read .env files

// const cors = require('cors');
import cors from 'cors';
// const express = require('express');
import express from 'express';
// const session = require('./lib/session.js');
import * as session from './lib/session.mjs';

const app = express();

app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(session.manager); // Use this route immediately after express.json() route

// const authRouter = require('./routes/auth.mjs').router;
import { router as authRouter } from './routes/auth.mjs';
// const searchRouter = require('./routes/search.js');
import { router as searchRouter } from './routes/search.mjs';
// const postsRouter = require('./routes/posts.js');
import { router as postsRouter } from './routes/posts.mjs';
// const followsRouter = require('./routes/follows.js');
import { router as followsRouter } from './routes/follows.mjs';

app.use('/', authRouter);
app.use('/search', searchRouter);
app.use('/posts', postsRouter);
app.use('/follows', followsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
	console.log(`PORT: ${PORT}`);
});