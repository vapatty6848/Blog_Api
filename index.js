const express = require('express');
require('dotenv').config();
const routerUser = require('./controllers/userController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (_req, res) => res.send());
app.use('/user', routerUser);

app.listen(PORT);
