const { StatusCodes } = require('http-status-codes');

const { User } = require('../models');
const CustomErr = require('../utils/customErr');
const { generateToken } = require('../security');
const loginValidator = require('../validations/login.validation');

const authLogin = async (email, password) => {
  loginValidator(email, password);
  const user = await User.findOne({ where: { email } });
  if (!user) throw new CustomErr(StatusCodes.BAD_REQUEST, 'Campos inválidos');

  const { id } = user.dataValues;
  return generateToken(email, id);
};

module.exports = {
  authLogin,
};
