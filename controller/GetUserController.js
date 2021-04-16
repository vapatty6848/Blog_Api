const { User } = require('../models');

const getUsersController = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

module.exports = getUsersController;
