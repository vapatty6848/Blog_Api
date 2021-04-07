const express = require('express');
const bodyParser = require('body-parser');
const Rescue = require('express-rescue');
const Routes = require('./routes');
const { handleError } = require('./middlewares');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/', Rescue(Routes));
app.use(handleError);

app.listen(3000, () => console.log('Running on port 3000'));
