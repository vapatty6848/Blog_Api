const express = require('express');
const UserRouter = require('./controllers/userController');
const LoginRouter = require('./controllers/loginController');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/user', UserRouter);

app.use('/login', LoginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
