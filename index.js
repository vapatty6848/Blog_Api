const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const handleError = require('./api/middlewares/handleError');

const app = express();

app.use(bodyParser.json());
app.use(routes);
app.use(handleError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
