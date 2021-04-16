const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const UserController = require('./controllers/userController');
const LoginController = require('./controllers/loginController');
//  const PostController = require('./controllers/PostController');

app.use('/user', UserController);
app.use('/login', LoginController);
//  app.use('/post', PostController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
