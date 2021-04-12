const express = require('express');

const app = express();

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const BlogPostsController = require('./controllers/BlogPostsController');

app.use(express.json());

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/post', BlogPostsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
