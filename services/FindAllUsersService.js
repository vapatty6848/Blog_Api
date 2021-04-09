const { User } = require('../models');

const FindAllUsersService = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = FindAllUsersService;
