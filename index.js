const express = require('express');
const app = express();

const UsersController = require('./controllers/UsersController');

app.use(express.json());

app.use('/user', UsersController);

app.get('/', (_req, res) => res.send('Hello World! o/'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
