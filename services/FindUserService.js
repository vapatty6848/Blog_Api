const { User } = require('../models');

const FindUserService = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = FindUserService;
