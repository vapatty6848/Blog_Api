const express = require('express');

const { users } = require('./controllers');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use(express.json());

app.use('/user', users);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
