const { Users } = require('../models');
const { generateToken } = require('../security');
const { authLogin } = require('../schemas');

const login = async ({ email, password }) => {
  authLogin(email, password);
  const userExists = await Users.findOne({ where: { email } });
  if (!userExists) throw new Error('C_ERR_LOGIN_NOT_FOUND');

  const token = generateToken(userExists.id);
  return { token };
};

module.exports = {
  login,
};
