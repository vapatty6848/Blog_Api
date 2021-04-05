const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userController = require('./controllers/userController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/', userController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
