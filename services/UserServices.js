const { User } = require('../models');

const getAllUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = (id) => User.findByPk(id, { attributes: { exclude: ['password'] } });

const getUserByEmail = (email) => User.findOne({ where: { email }, attributes: { exclude: ['password'] } });

const deleteUser = (id) => User.destroy({ where: { id } });

const createUser = (displayName, email, password, image) => {
  const user = User.create({ displayName, email, password, image });
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  createUser,
};
