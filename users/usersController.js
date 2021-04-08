const usersService = require('./usersService');

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

module.exports = {
  createUser,
  getAllUsers,
};
