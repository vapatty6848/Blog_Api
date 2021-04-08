const { User } = require('../models');

const createUser = async (dataUser) => User.create(dataUser);

const findUserByEmail = async (email) => User.findOne({ where: { email } });

const findAllUsers = async () => User.findAll();

const findUsersById = async (id) => User.findByPk(id);

const deleteUser = async (id) => User.destroy(id);

module.exports = {
  createUser,
  findUserByEmail,
  findAllUsers,
  findUsersById,
  deleteUser,
};
