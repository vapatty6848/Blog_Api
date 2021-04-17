const { StatusCodes } = require('http-status-codes');

const { User } = require('../models');
const CustomErr = require('../utils/customErr');
const { generateToken } = require('../security');
const userValidator = require('../validations/user.validation');

const createUser = async (displayName, email, password, image) => {
  userValidator(displayName, email, password);

  const user = await User.findOne({ where: { email } });
  if (user) throw new CustomErr(StatusCodes.CONFLICT, 'Usuário já existe');

  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
  return generateToken(email, id);
};

const getAll = async () => User.findAll();

const getById = async (id) => {
  const user = await User.findOne({ raw: true, where: { id } });
  if (!user) throw new CustomErr(StatusCodes.NOT_FOUND, 'Usuário não existe');
  return user;
};

const destroyUser = async (email) => User.destroy({ where: { email } });

module.exports = {
  createUser,
  getAll,
  getById,
  destroyUser,
};
