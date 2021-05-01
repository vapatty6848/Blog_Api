const { Router } = require('express');
const { User } = require('../models');
const { createToken } = require('../services/CreateToken');

const ControllerUser = new Router();
const success = 200;
const created = 201;
const intServerError = 500;
const message = 'Unexpected Error!';

ControllerUser.get('/', (_req, res) => {
  User.findAll().then((users) => res.status(success).json(users))
    .catch((error) => {
      console.log(error);
      return res.status(intServerError).json({ message });
    });
});

ControllerUser.post('/', (req, res) => {
  const { displayName, password, email, image } = req.body;
  const token = createToken(email, password);

  User.create({ displayName, email, password, image })
    .then((_user) => res.status(created).json({ token }))
    .catch((error) => {
      console.log(error);
      return res.status(intServerError).json({ message });
    });
});

module.exports = ControllerUser;
