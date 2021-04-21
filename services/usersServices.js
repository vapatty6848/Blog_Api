const { User } = require('../models');
const AppError = require('../utils/appErrors');
const userValidation = require('../validation/userValidation');
const token = require('../auth/token');

const createUser = async ({ displayName, email, password, image }) => {
  userValidation(displayName, email, password);

  const user = await User.findOne({ where: { email } });
  if (user) throw new AppError('409', 'Usuário já existe');

  await User.create({ displayName, email, password, image });

  return token({ email });
};

const findAllUsers = async () => User.findAll();

const findById = async (id) => {
  const userById = await User.findByPk(id);
  if (!userById) throw new AppError('404', 'Usuário não existe');

  return userById;
};

module.exports = {
  createUser,
  findAllUsers,
  findById,
};
