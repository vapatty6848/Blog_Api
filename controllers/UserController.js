const { Router } = require('express');
const { User } = require('../models');
const { generateToken } = require('../services/GenerateToken');

const UserController = new Router();
const SUCCESS = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;
const message = 'Unexpected Error!';

UserController.get('/', (_req, res) => {
  User.findAll().then((users) => res.status(SUCCESS).json(users))
    .catch((error) => {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({ message });
    });
});

UserController.post('/', (req, res) => {
  const { displayName, password, email, image } = req.body;
  const token = generateToken(email, password);

  User.create({ displayName, email, password, image })
    .then((_user) => res.status(CREATED).json({ token }))
    .catch((error) => {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({ message });
    });
});

module.exports = UserController;
