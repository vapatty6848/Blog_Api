const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const user = require('./controllers/userController');
const login = require('./controllers/loginController');

app.use(bodyParser.json());

app.use('/user', user);
app.use('/login', login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
