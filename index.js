const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const {
  displayNameChecked,
  validEmail,
  validPassword,
  existEmail,
} = require('./services/midllewaresUser');

const userController = require('./controllers/users');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ---------------------------------------------------------

app.post('/user', displayNameChecked, validEmail, validPassword, existEmail, userController.createNew);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
