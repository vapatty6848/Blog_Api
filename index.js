const express = require('express');
const bodyParser = require('body-parser');
const { UserRouter } = require('./controller/userController');
const { LoginRouter } = require('./controller/loginController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', UserRouter);

app.use('/login', LoginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
