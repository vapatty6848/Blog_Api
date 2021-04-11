const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());

const login = require('./controller/LoginController');
// user imports
const createUsers = require('./controller/UsersController');
const userValidation = require('./utils/userValidation');

app.use('/users', userValidation.postValidation, createUsers);
app.use('/users', createUsers);
app.use('/login', userValidation.loginValidation, login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));
