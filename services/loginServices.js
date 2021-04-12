const { User } = require('../models');
const AppError = require('../utils/appErrors');
const loginValidation = require('../validation/loginValidation');
const generateToken = require('../auth/generateToken');

const authenticateUser = async (userCredentials) => {
  const { email, password } = userCredentials;
  loginValidation(email, password);

  const user = await User.findOne({ where: { email } });
  if (!user) throw new AppError('400', 'Campos inválidos');

  const { dataValues } = user;
  return generateToken(dataValues);
};

module.exports = { authenticateUser };
