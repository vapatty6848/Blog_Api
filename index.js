const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers');

const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', controller.usersController);
app.use('/', controller.loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
