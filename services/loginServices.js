const { User } = require('../models');
const AppError = require('../utils/appErrors');
const loginValidation = require('../validation/loginValidation');
const generateToken = require('../auth/token');

const authenticateUser = async (credentials) => {
  const { email, password } = credentials;
  loginValidation(email, password);

  const user = await User.findOne({ where: { email } });
  if (!user) throw new AppError('400', 'Campos inválidos');

  const { dataValues } = user;
  return generateToken(dataValues);
};

module.exports = { authenticateUser };
