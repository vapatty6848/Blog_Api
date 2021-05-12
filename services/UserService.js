const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({});
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const deleteUserByEmail = async (email) => {
  const user = await User.destroy({ where: { email } });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  deleteUserByEmail,
};
