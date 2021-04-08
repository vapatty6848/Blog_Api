const { Router } = require('express');
const { User } = require('../models');
const { generateToken } = require('../services/GenerateToken');
const { decodeToken } = require('../services/DecodeToken');
const {
  validateDisplayName,
  validatePassword,
  validateEmail,
  validateImage,
} = require('../middlewares/ValidateDataUser');
const { duplicatedEmail } = require('../middlewares/DuplicatedEmail');
const { validateToken } = require('../middlewares/ValidateToken');

const UserController = new Router();
const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const unexpectedError = (error, res) => {
  const message = 'Unexpected Error!';

  console.log(error);
  return res.status(INTERNAL_SERVER_ERROR).json({ message });
};

UserController.get('/', validateToken, (_req, res) => {
  User.findAll().then((users) => res.status(SUCCESS).json(users))
    .catch((error) => unexpectedError(error, res));
});

UserController.get('/:id', validateToken, (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id } }).then((user) => {
    if (user === null) {
      const message = 'Usuário não existe';

      return res.status(NOT_FOUND).json({ message });
    }
    return res.status(SUCCESS).json(user);
  })
    .catch((error) => unexpectedError(error, res));
});

UserController.post(
  '/',
  validateDisplayName,
  validatePassword,
  validateEmail,
  duplicatedEmail,
  validateImage,
  (req, res) => {
    const { displayName, password, email, image } = req.body;
    const token = generateToken(email, password);

    User.create({ displayName, email, password, image })
      .then((_user) => res.status(CREATED).json({ token }))
      .catch((error) => unexpectedError(error, res));
  },
);

UserController.delete('/me', validateToken, (req, res) => {
  const { authorization } = req.headers;
  const [email] = decodeToken(authorization);

  User.findOne({ where: { email } }).then((foundUser) => {
    const message = 'Usuário não existe';

    if (foundUser === null) return res.status(NOT_FOUND).json({ message });
    return User.destroy({ where: { email } });
  }).then((_destroyedUser) => res.status(NO_CONTENT).send())
    .catch((error) => unexpectedError(error, res));
});

module.exports = UserController;
