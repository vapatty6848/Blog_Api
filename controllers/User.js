const { Router } = require('express');
const { addUser, getAllUsers } = require('../services/UserSevice');
const token = require('../auth/createToken');
const { status } = require('../middlewares/errorMessage');
const { validateFields, verifyGetAllUsers } = require('../middlewares/userVerification');

const UserController = Router();

UserController.post('/', validateFields, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await addUser(displayName, email, password, image);
  const newToken = token(newUser);
  res.status(status.Created).json({ token: newToken });
});

UserController.get('/', verifyGetAllUsers, async (req, res) => {
  const users = await getAllUsers();
  res.status(status.Ok).json(users);
});

module.exports = UserController;
