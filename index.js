const express = require('express');

const app = express();

const usersController = require('./controllers/usersController');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', usersController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
