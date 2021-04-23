const express = require('express');

const userController = require('./controller/UsersController');
const blogController = require('./controller/BlogsController');

const app = express();

app.use(express.json());

app.use('/user', userController);
app.use('/post', blogController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
