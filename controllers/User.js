const { Router } = require('express');
const { addUser, getAllUsers, getUserById } = require('../services/UserSevice');
const token = require('../auth/createToken');
const { status } = require('../middlewares/errorMessage');
const {
  validateFields,
  verifyGetAllUsers,
  verifyGetById,
} = require('../middlewares/userVerification');

const UserController = Router();

UserController.post('/', validateFields, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await addUser(displayName, email, password, image);
  const newToken = token(newUser);
  return res.status(status.Created).json({ token: newToken });
});

UserController.get('/', verifyGetAllUsers, async (req, res) => {
  const users = await getAllUsers();
  return res.status(status.Ok).json(users);
});

UserController.get('/:id', verifyGetById, async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  return res.status(status.Ok).json(user);
});

module.exports = UserController;
