const { User } = require('../models');
const AppError = require('../utils/appErrors');
const userValidation = require('../validation/userValidation');
const generateToken = require('../auth/generateToken');

const createUser = async ({ displayName, email, password, image }) => {
  userValidation(displayName, email, password);

  const user = await User.findOne({ where: { email } });
  if (user) throw new AppError('409', 'Usuário já existe');

  const { dataValues } = await User.create(
    { displayName, email, password, image },
    { returning: true },
  );

  return generateToken(dataValues);
};

module.exports = { createUser };
