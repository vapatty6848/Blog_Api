const express = require('express');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const BlogPostController = require('./controllers/BlogPostController');

const app = express();
app.use(express.json());
app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/ping', (request, response) => {
  response.send('PONG!');
});

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/post', BlogPostController);

app.use((error, request, response, _next) => {
  response.status(error.code).json({ message: error.message });
});
