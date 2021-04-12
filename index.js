const express = require('express');
require('dotenv').config();

const controllerUser = require('./controllers/controllerUser');
const controllerLogin = require('./controllers/controllerLogin');
const controllerBlogPost = require('./controllers/controllerBlogPost');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllerUser);
app.use('/login', controllerLogin);
app.use('/post', controllerBlogPost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
