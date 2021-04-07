const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const UsersController = require('./controllers/UsersController');
const loginController = require('./controllers/loginController');
const postsController = require('./controllers/postsController');

app.use(express.json());

app.use('/user', UsersController);
app.use('/login', loginController);
app.use('/post', postsController);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
