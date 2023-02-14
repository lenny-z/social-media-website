const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    console.log(JSON.stringify(req.body, null, 4));
    res.send('yo');
});

require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});