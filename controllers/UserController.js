const { Router } = require('express');

const { validatedUsers, verifyEmailUser } = require('../middlewares/validateUsers');
const AuthorizationUsers = require('../middlewares/authenticates');
const { createNewUser, usersAll, userId, userDelete } = require('../services/UserServices');
const createToken = require('../services/tokenCreate');
// const validateToken = require('../middlewares/validateToken');

const UserController = new Router();

UserController.post('/', validatedUsers, verifyEmailUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userToken = await createNewUser(displayName, email, password, image);
  const payload = { email, displayName, userId: userToken.id };
  const token = createToken(payload);
  res.status(201).json({ token });
});

UserController.delete('/me', AuthorizationUsers, async (req, res) => {
  // const { authorization } = req.headers;
  // const idUser = await validateToken(authorization);
  const { email } = req.user;
  await userDelete(email);
  return res.status(204).json();
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
