const { User } = require('../models');

const LoginService = async (email, password) => {
  const user = await User.findAll({
    where: { email, password },
  });
  return user;
};

module.exports = LoginService;
