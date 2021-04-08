require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const usersController = require('./controllers/users');
const loginController = require('./controllers/login');

const app = express();

app.use(json());

app.use('/user', usersController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send());

app.listen(3000, () => console.log('ouvindo porta 3000!'));
