const express = require('express');
require('dotenv').config();
const User = require('./controllers/UsersController');
const Login = require('./controllers/LoginController');

const PORT = parseInt(process.env.PORT, 10) || 3000;

const bodyParser = express.json();

const app = express();

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', User);

app.use('/login', Login);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
