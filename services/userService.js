const { User } = require('../models');

// Criar usuário
const createUser = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

// Listar usuário por email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

// Listar todos os usuários
const getAllUsers = async () => {
  const users = await User.findAll({});
  return users;
};

// Listar usuário por ID
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

// Deletar usuário por email
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
