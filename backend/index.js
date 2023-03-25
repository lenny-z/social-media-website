require('dotenv').config(); // State this as early as possible to read .env files
const cors = require('cors');
const express = require('express');
const sessions = require('./sessions.js');
const queries = require('./queries.js');

const app = express();

app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(sessions.manager());

queries.testConnect();

async function isAuthenticated(req, res, next) {
	if (await redisStore.get(req.session.id)) {
		console.log('pog');
	}
}

const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');

app.use('/login', loginRouter);
app.use('/register', registerRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}\n`);
});