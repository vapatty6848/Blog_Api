const { Router } = require('express');
const { User } = require('../models');
const { generateToken } = require('../services/GenerateToken');

const UserController = new Router();
const SUCCESS = 201;
const INTERNAL_SERVER_ERROR = 500;

UserController.post('/', (req, res) => {
  const { displayName, password, email, image } = req.body;
  const token = generateToken(email, password);

  User.create({ displayName, email, password, image })
    .then((_user) => res.status(SUCCESS).json({ token }))
    .catch((error) => {
      const message = 'Unexpected Error!';

      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({ message });
    });
});

module.exports = UserController;
