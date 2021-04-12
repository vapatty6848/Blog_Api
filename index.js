const express = require('express');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const PostsController = require('./controllers/PostsController');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/post', PostsController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', (error, req, res, _next) => {
  console.error('error', error.message);
  res.status(error.status).json({ message: error.message });
});
