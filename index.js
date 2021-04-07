const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controllers');
const { validateFields } = require('./middlewares/userVerification');
const { validateLogin } = require('./middlewares/loginVerification');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser());
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
app.use('/user', validateFields, Controller.UserController);
app.use('/login', validateLogin, Controller.LoginController);
// não remova esse endpoint, e para o avaliador funcionar commit
app.get('/', (request, response) => {
  response.send();
});
