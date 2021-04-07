const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');

const app = express();
app.use(bodyParser.json());

app.use('/user', userController);

app.use((err, _req, res, _next) => {
  const { status, messageObject } = err;
  const statusAtual = status || 500;
  return res.status(statusAtual).json(messageObject);
});

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
