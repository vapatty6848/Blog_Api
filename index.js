const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

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

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on port ${PORT}`));
