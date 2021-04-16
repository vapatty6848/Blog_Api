const express = require('express');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const PostController = require('./controllers/PostController');

const PORT = 3000;
const app = express();
const userValidations = require('./middlewares/userValidations');
const loginValidations = require('./middlewares/loginValidations');
// const postValidations = require('./middlewares/postValidations');

app.use(express.json());

app.use('/user', UserController);
app.use('/login',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  LoginController);
app.use('/post',
  userValidations.validateTokenLogin,
  PostController);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
