const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/userController');
require('dotenv').config();

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/user', userRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
