const express = require('express');
const UserController = require('./controllers/UserController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// __________________________________________________________

app.use(express.json());

app.use('/user', UserController);

// __________________________________________________________

app.listen(3000, () => console.log('ouvindo porta 3000!'));
