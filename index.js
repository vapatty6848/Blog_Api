const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/UserController');
const BlogPostController = require('./controllers/BlogPostController');
const LoginController = require('./controllers/LoginController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserController);

app.use('/login', LoginController);

app.use('/post', BlogPostController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
