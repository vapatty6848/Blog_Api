const express = require('express');

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const PostController = require('./controllers/PostConstroller');

const app = express();
app.use(express.json());

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/post', PostController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
