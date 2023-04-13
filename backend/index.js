require('dotenv').config(); // State this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const session = require('./lib/session.js');

const app = express();

app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(session.manager); // Use this route immediately after express.json() route

const authRouter = require('./routes/auth.js').router;
// const loginRouter = require('./routes/login.js');
// const registerRouter = require('./routes/register.js');
const searchRouter = require('./routes/search.js');
const postsRouter = require('./routes/posts.js');
const followsRouter = require('./routes/follows.js');
// const logoutRouter = require('./routes/logout.js');

app.use('/', authRouter);
// app.use('/login', loginRouter);
// app.use('/register', registerRouter);
app.use('/search', searchRouter);
app.use('/posts', postsRouter);
// app.use('/logout', logoutRouter);
app.use('/follows', followsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
	console.log(`PORT: ${PORT}`);
});