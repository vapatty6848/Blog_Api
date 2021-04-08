const { User } = require('../models');

const FindAllUsersServices = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = FindAllUsersServices;
