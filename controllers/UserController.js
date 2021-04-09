const { Router } = require('express');

const { validatedUsers, verifyEmailUser } = require('../middlewares/validateUsers');
const AuthorizationUsers = require('../middlewares/authentictionToken');
const { createNewUser, usersAll, userId } = require('../services/UserServices');
const createToken = require('../services/tokenCreate');

const UserController = new Router();

UserController.post('/', validatedUsers, verifyEmailUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  await createNewUser(displayName, email, password, image);
  const userToken = { displayName, email };
  const token = createToken(userToken);
  res.status(201).json({ token });
});

UserController.get('/:id', AuthorizationUsers, async (req, res) => {
  const { id } = req.params;
  const [user] = await userId(id);
  if (!user) res.status(404).json({ message: 'Usuário não existe' });
  res.status(200).json(user);
});

UserController.get('/', AuthorizationUsers, async (req, res) => {
  const users = await usersAll();
  res.status(200).json(users);
});

module.exports = UserController;
