const { Router } = require('express');

const { User } = require('../models');

const UserController = Router();

UserController.get('/', async (_req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

UserController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.status(200).json(user);
});

module.exports = UserController;
