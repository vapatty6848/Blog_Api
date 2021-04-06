const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const routes = require('./main.routes');

const app = express();
app.use(bodyParser.json());

app.use(routes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
