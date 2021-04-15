const express = require('express');

const bodyParser = require('body-parser');
const a = require('./src/controllers/UserController');
const LoginController = require('./src/controllers/LoginController');

require('dotenv').config();

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, res) => {
  res.send();
});

app.use('/user', a.userController);

app.use('/login', LoginController);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'notfound' });
});

app.use('/', (error, _request, res, _next) => {
  res.status(error.status).json({ message: error.message });
});
