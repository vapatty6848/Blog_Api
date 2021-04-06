const express = require('express');
const {
  UserController,
  PostController,
  LoginController,
} = require('./controllers');
const error = require('./middlewares/error');

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/post', PostController);
app.use(error);
