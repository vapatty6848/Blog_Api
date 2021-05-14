const express = require('express');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const LoginController = require('./controllers/LoginController');

const app = express();

app.use(express.json());

app.use('/user', UserController);
app.use('/post', PostController);
app.use('/login', LoginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
