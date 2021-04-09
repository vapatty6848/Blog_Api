const { User } = require('../models');

const CreateUserService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

module.exports = CreateUserService;
