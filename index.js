const express = require('express');

const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/post', PostController);
app.use('/user', UserController);
app.use('/login', LoginController);
app.listen(3000, () => console.log('ouvindo na porta 3000!'));
