const express = require('express');
const bodyParser = require('body-parser');
const Rescue = require('express-rescue');
const Routes = require('./routes');

const { handleError } = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.use('/', Rescue(Routes));

app.use(handleError);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
