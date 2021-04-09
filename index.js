const bodyParser = require('body-parser');
const express = require('express');
const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserController);
app.use('/login', LoginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
