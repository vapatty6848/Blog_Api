const { Router } = require('express');
const { User } = require('../models');
const { createToken } = require('../services/CreateToken');
const { tokenDecoded } = require('../services/TokenDecoded');
const { displayNameValidation, passwordValidation, emailValidation, imageValidation } = require('../middlewares/UserValidate');
const { emailDuplicatedVerify } = require('../middlewares/EmailDuplicatedVerify');
const { tokenValidate } = require('../middlewares/TokenValidate');

const ControllerUser = new Router();
const success = 200;
const created = 201;
const noContent = 204;
const notFound = 404;
const intServerError = 500;

const unexpectedError = (error, res) => {
  const message = 'Unexpected Error!';

  console.log(error);
  return res.status(intServerError).json({ message });
};

ControllerUser.get('/', tokenValidate, (_req, res) => {
  User.findAll().then((users) => res.status(success).json(users))
    .catch((error) => unexpectedError(error, res));
});

ControllerUser.get('/:id', tokenValidate, (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id } }).then((user) => {
    if (user === null) {
      const message = 'Usuário não existe';

      return res.status(notFound).json({ message });
    }
    return res.status(success).json(user);
  })
    .catch((error) => unexpectedError(error, res));
});

ControllerUser.post('/', displayNameValidation, passwordValidation, emailValidation, emailDuplicatedVerify, imageValidation, (req, res) => {
  const { displayName, password, email, image } = req.body;
  const token = createToken(email, password);

  User.create({ displayName, email, password, image })
    .then((_user) => res.status(created).json({ token }))
    .catch((error) => unexpectedError(error, res));
});

ControllerUser.delete('/me', tokenValidate, (req, res) => {
  const { authorization } = req.headers;
  const [email] = tokenDecoded(authorization);

  User.find({ where: { email } }).then((foundUser) => {
    const message = 'Usuário não existe';

    if (foundUser === null) return res.status(notFound).json({ message });
    return User.destroy({ where: { email } });
  }).then((_destroyedUser) => res.status(noContent).send())
    .catch((error) => unexpectedError(error, res));
});

module.exports = ControllerUser;
