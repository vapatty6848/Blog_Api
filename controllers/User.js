const { Router } = require('express');
const { addUser, getAllUsers, getUserById, deleteUser } = require('../services/UserSevice');
const token = require('../auth/createToken');
const validateToken = require('../auth/validateToken');
const { status } = require('../middlewares/errorMessage');
const {
  validateFields,
  verifyToken,
  verifyGetById,
} = require('../middlewares/userVerification');

const UserController = Router();

UserController.post('/', validateFields, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await addUser(displayName, email, password, image);
  const newToken = token(newUser);
  return res.status(status.Created).json({ token: newToken });
});

UserController.get('/', verifyToken, async (req, res) => {
  const users = await getAllUsers();
  return res.status(status.Ok).json(users);
});

UserController.get('/:id', verifyGetById, async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  return res.status(status.Ok).json(user);
});

UserController.delete('/me', verifyToken, async (req, res) => {
  const { authorization } = req.headers;
  const { id } = validateToken(authorization);
  await deleteUser(id);
  return res.status(status.No_Content).end();
});

module.exports = UserController;
