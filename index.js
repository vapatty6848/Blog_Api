const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const UserRouter = require('./controllers/UserController');
const LoginRouter = require('./controllers/LoginController');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', UserRouter);
app.use('/login', LoginRouter);

app.listen(3000, () => console.log('ouvindo na porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
