const { Router } = require('express');
const { User } = require('../models');
const { generateToken } = require('../services/GenerateToken');

const UserController = new Router();
const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const unexpectedError = (error, res) => {
  const message = 'Unexpected Error!';

  console.log(error);
  return res.status(INTERNAL_SERVER_ERROR).json({ message });
};

UserController.get('/', (_req, res) => {
  User.findAll().then((users) => res.status(SUCCESS).json(users))
    .catch((error) => unexpectedError(error, res));
});

UserController.get('/:id', (req, res) => {
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

UserController.post('/', (req, res) => {
  const { displayName, password, email, image } = req.body;
  const token = generateToken(email, password);

  User.create({ displayName, email, password, image })
    .then((_user) => res.status(CREATED).json({ token }))
    .catch((error) => unexpectedError(error, res));
});

module.exports = UserController;
