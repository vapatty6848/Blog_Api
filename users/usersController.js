const usersService = require('./usersService');
const { Users } = require('../models');

const createUser = async (req, res) => {
  console.log('controller');
  const { displayName, email, password, image } = req.body;

  const { message, token } = await usersService.createUser(displayName, email, password, image);

  if (message) return res.status(409).json({ message });

  return res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  console.log('GET ALL USERS');
  console.log('userId', req.userId);

  const users = await usersService.getAllUsers();

  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { userById, message } = await usersService.getById(id);

  if (message) return res.status(404).json({ message });

  return res.status(200).json(userById);
};

const removeUser = async (req, res) => {
  const { userId } = req;

  await Users.destroy({ where: { id: userId } });

  return res.send(204);
};

module.exports = {
  createUser,
  getAllUsers,
  getById,
  removeUser,
};
