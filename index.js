require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());

// Login
const login = require('./controller/LoginController');
// User
const createUsers = require('./controller/UsersController');
// Post
const posts = require('./controller/BlogPostsController');

app.use('/user', createUsers);
app.use('/login', login);
app.use('/post', posts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));
