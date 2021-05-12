const { Router } = require('express');

const { validateUserData } = require('../middlewares/validateUserData');
const { createToken, validateToken } = require('../auth/token');
const {
  getAllUsers,
  createUser,
  deleteUserByEmail,
  getUserByEmail,
  getUserById,
} = require('../services/UserService');

const UserController = new Router();

UserController.get('/', validateToken, async (request, response) => {
  const users = await getAllUsers();
  return response.status(200).json(users);
});
UserController.get('/:id', validateToken, async (request, response) => {
  const { id } = request.params;
  const user = await getUserById(id);
  if (!user) {
    return response.status(404).json({ message: 'Usuário não existe' });
  }
  return response.status(200).json(user);
});
UserController.post('/', validateUserData, async (request, response) => {
  const { displayName, email, password, image } = request.body;
  const user = await getUserByEmail(email);
  if (user) {
    return response.status(409).json({ message: 'Usuário já existe' });
  }
  await createUser(displayName, email, password, image);
  const token = createToken(email);
  return response.status(201).json({ token });
});
UserController.delete('/me', validateToken, async (request, response) => {
  const { email } = request.user;
  await deleteUserByEmail(email);
  return response.status(204).json({});
});
module.exports = UserController;
