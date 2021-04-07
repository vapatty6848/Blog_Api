const { User } = require('../models');
const Validations = require('./validations');
const JWT = require('./utils');

const findById = async ({ id, token }) => {
  const tokenValidation = await Validations.validateToken(token);

  if (tokenValidation.payload) return tokenValidation;

  const result = await Validations.validateUser({ id });

  if (result.payload) return result;

  return result;
};

const findAll = async (token) => {
  const tokenValidation = await Validations.validateToken(token);

  if (tokenValidation.payload) return tokenValidation;

  const result = await User.findAll();
  return result;
};

const createUser = async ({ displayName, email, password, image }) => {
  const nameValidation = Validations.validateName(displayName);
  const emailValidation = await Validations.validateEmail(email);
  const passwordValidation = Validations.validatePassword(password);

  if (nameValidation.payload) return nameValidation;
  if (emailValidation.payload) return emailValidation;
  if (passwordValidation.payload) return passwordValidation;

  const newUser = await User.create({ displayName, email, password, image });
  const { dataValues: { id } } = newUser;

  const result = JWT.generateToken({ id, displayName });
  return result;
};

const deleteUser = async ({ token }) => {
  const tokenValidation = await Validations.validateToken(token);

  if (tokenValidation.payload) return tokenValidation;

  const userIdFromToken = tokenValidation;
  await User.destroy({
    where: { id: userIdFromToken },
  });

  return true;
};

module.exports = {
  findAll,
  createUser,
  findById,
  deleteUser,
};
