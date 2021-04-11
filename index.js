const express = require('express');

const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');
const PostController = require('./controllers/PostController');

const app = express();

app.use(express.json());
app.use('/user', UsersController);
app.use('/login', LoginController);
app.use('/post', PostController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
