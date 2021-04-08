const express = require('express');
require('dotenv').config();
const { routerUser, routerLogin } = require('./controllers');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (_req, res) => res.send());
app.use('/user', routerUser);
app.use('/login', routerLogin);

app.listen(PORT);
