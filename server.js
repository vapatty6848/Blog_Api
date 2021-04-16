const bodyParser = require('body-parser');
const express = require('express');
const LoginRouter = require('./routes/LoginRoute');
const CreateUserRouter = require('./routes/CreateUser');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/user', CreateUserRouter);
app.use('/login', LoginRouter);

module.exports = app;
