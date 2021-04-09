const express = require('express');
require('dotenv').config();
const { routerUser, routerLogin, routerPost } = require('./controllers');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (_req, res) => res.send());
app.use('/user', routerUser);
app.use('/login', routerLogin);
app.use('/post', routerPost);

app.listen(PORT);
