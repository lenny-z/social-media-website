require('dotenv').config(); // State this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const sessions = require('./sessions.js');

const app = express();

app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(sessions); // Use this route immediately after express.json() route

const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');
const postsRouter = require('./routes/posts.js');

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/posts', postsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
	console.log(`PORT: ${PORT}`);
});