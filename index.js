const express = require('express');
const controllers = require('./controllers');
// const validateToken = require('./auth/validateToken');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllers.UsersController);
app.use('/login', controllers.LoginController);
app.use('/user:id', controllers.UsersController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
