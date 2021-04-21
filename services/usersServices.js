const { User } = require('../models');
const AppError = require('../utils/appErrors');
const userValidation = require('../validation/userValidation');
const generateToken = require('../auth/token');

const createUser = async (displayName, email, password, image) => {
  userValidation(displayName, email, password);

  const user = await User.findOne({ where: { email } });
  if (user) throw new AppError('409', 'Usuário já existe');

  const { dataValues: { id } } = await User.create({ displayName, email, password, image });

  return generateToken({ email, id });
};

const findAllUsers = async () => User.findAll();

const findById = async (id) => {
  const userById = await User.findOne(
    { raw: true, where: { id } },
  );
  if (!userById) throw new AppError('404', 'Usuário não existe');

  return userById;
};

const deleteUser = async (email) => User.destroy({ where: { email } });

module.exports = {
  createUser,
  findAllUsers,
  findById,
  deleteUser,
};
