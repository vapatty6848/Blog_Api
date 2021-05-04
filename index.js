const express = require('express');
const bodyParser = require('body-parser');

const { handleError } = require('./middlewares');
const routes = require('./router.js');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(routes);
app.use(handleError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));