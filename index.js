const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

app.use('/user', routes.users);
app.use('/post', routes.posts);
app.use('*', routes.notFound);

app.use(middlewares.handleError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
