const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');
require('dotenv').config();

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

// Req 01
app.use('/user', userRouter);

// Req 012
app.use('/login', loginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
