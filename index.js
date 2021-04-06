const express = require('express');

const app = express();

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', usersController);

app.use('/login', loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
