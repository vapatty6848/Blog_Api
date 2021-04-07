const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

const RouterUser = require('./cotrollers/UserController');
const RouterLogin = require('./cotrollers/LoginController');

app.use(express.json());
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', RouterUser);
app.use('/login', RouterLogin);

app.listen(3000, () => console.log(`Servidor rodando na porta: ${PORT}`));
