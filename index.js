require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const { userRouter, loginRouter, postRouter } = require('./controllers');

const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('./middlewares/creationUserValidations');
const { validateEmailOnLogin, validatePasswordOnLogin } = require('./middlewares/loginValidations');
const validateToken = require('./auth/validateToken');
const { postValidate } = require('./middlewares');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

app.listen(PORT);
console.log(`Server rodando a porta: ${PORT}`);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', validateEmailOnLogin, validatePasswordOnLogin, loginRouter.login);

app.get('/user', validateToken, userRouter.getAll);
app.get('/user/:id', validateToken, userRouter.findByID);
app.post('/user', validateDisplayName, validateEmail, validatePassword, userRouter.createUser);
app.delete('/user/me', validateToken, userRouter.deleteMe);

app.post('/post/', validateToken, postValidate.validatePost, postRouter.createPost);
app.get('/post', validateToken, postRouter.getAll);
app.get('/post/search?', validateToken, postRouter.searchPost);
app.get('/post/:id', validateToken, postRouter.getPostByID);
app.put('/post/:id', validateToken, postValidate.validatePost, postRouter.update);
app.delete('/post/:id', validateToken, postRouter.deletePost);
