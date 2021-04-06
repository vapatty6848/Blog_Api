const { Router } = require('express');

const UsersController = Router();

const { User } = require('../models');

UsersController.get('/', async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
});

module.exports = UsersController;
