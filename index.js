const express = require('express');

const {
  userController,
  loginController,
  postController,
} = require('./controllers');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', userController);

app.use('/login', loginController);

app.use('/post', postController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
