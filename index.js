const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const {
  validateDisplayName,
  validatePassword,
  validateEmail,
  validateImage,
} = require('./middlewares/ValidateDataUser');
const {
  validatePasswordLogin,
  validateEmailLogin,
} = require('./middlewares/ValidateDataLogin');
const { duplicatedEmail } = require('./middlewares/DuplicatedEmail');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (_request, response) => {
  response.send();
});

app.use(
  '/user',
  validateImage,
  validateDisplayName,
  validatePassword,
  validateEmail,
  duplicatedEmail,
  UserController,
);

app.use(
  '/login',
  validatePasswordLogin,
  validateEmailLogin,
  LoginController,
);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
