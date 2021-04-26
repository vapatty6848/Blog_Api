const express = require('express');
const User = require('./controllers/UsersController');
const Login = require('./controllers/LoginController');

const bodyParser = express.json();

const app = express();

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', User);

app.use('/login', Login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
