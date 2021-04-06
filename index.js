const express = require('express');

const app = express();

const UsersController = require('./controllers/UsersController');
const loginController = require('./controllers/loginController');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UsersController);
app.use('/login', loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
