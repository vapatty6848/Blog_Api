const { Router } = require('express');

const { User } = require('../models');
const { validateUserData } = require('../middlewares/validateUserData');
const { createToken, validateToken } = require('../auth/token');
const { createUser } = require('../services/UserService');

const UserController = new Router();

UserController.get('/', validateToken, async (request, response) => {
  const users = await User.findAll({});
  response.status(200).json(users);
});

UserController.get('/:id', async (request, response) => {
  response.status(200).json({ message: 'UserController' });
});

UserController.post('/', validateUserData, async (request, response) => {
  const { displayName, email, password, image } = request.body;

  const user = await User.findOne({ where: { email } });

  if (user) {
    return response.status(409).json({ message: 'Usuário já existe' });
  }

  await createUser(displayName, email, password, image);

  const token = createToken(email);

  return response.status(201).json({ token });
});

UserController.delete('/me', async (request, response) => {
  response.status(200).json({ message: 'UserController' });
});

module.exports = UserController;
