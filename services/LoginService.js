const { User } = require('../models');

const LoginService = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
  });
  return user;
};

module.exports = LoginService;
