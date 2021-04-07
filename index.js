const express = require('express');
const UserController = require('./controllers/UserController');
const PORT = 3000;
const app = express();
const { validateName, validateEmail, validatePassword } = require('./middlewares/validations');

app.use(express.json());
app.use('/user', validateName, validatePassword, validateEmail, UserController);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
