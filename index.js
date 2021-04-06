const express = require('express');
require('dotenv').config();

const routes = require('./main.routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(routes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
