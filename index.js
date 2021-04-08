const express = require('express');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use('/user', UserController);
app.use('/login', LoginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
