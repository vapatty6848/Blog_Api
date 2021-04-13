const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const UsersController = require('./controllers/UsersController');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', rescue(UsersController));

app.use((err, req, res, _) => {
  const codeStatus = (err.codeStatus) ? err.codeStatus : 500;
  res.status(codeStatus).json({ message: err.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
