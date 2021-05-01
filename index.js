const express = require('express');
const cors = require('cors');
const ControllerUser = require('./controllers/ControllerUser');
const ControllerLogin = require('./controllers/ControllerLogin');

const { displayNameValidation, passwordValidation, emailValidation, imageValidation } = require('./middlewares/UserValidate');
const { passwordLoginValidation, emailLoginValidation } = require('./middlewares/LoginValidate');
const { emailDuplicatedVerify } = require('./middlewares/EmailDuplicatedVerify');
const { tokenValidate } = require('./middlewares/TokenValidate');
const { verifyRegister } = require('./middlewares/VerifyRegister');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// não remova esse endpoint, é para o avaliador funcionar.
app.get('/', (request, response) => {
  response.send();
});

app.use(
  '/user',
  imageValidation,
  displayNameValidation,
  passwordValidation,
  emailValidation,
  emailDuplicatedVerify,
  tokenValidate,
  ControllerUser,
);

app.use(
  '/login',
  passwordLoginValidation,
  emailLoginValidation,
  verifyRegister,
  ControllerLogin,
);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
