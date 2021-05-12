const express = require('express');

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const PostController = require('./controllers/PostController');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/post', PostController);

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
