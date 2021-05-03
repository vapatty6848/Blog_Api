const { Users } = require('../models');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const findAllUsers = async () => {
  const foundUsers = await Users.findAll();

  return foundUsers;
};

const findUserById = async (id) => {
  const foundUser = await Users.findOne({ where: { id } });
  if (!foundUser) {
    return {
      status: NOT_FOUND,
      message: 'Usuário não existe',
      isError: true,
    };
  }
  return foundUser;
};

const findUserByEmailAndPassword = async (email, password) => {
  const dataChecked = await Users.findOne({ where: { email, password } });
  if (!dataChecked || dataChecked.email !== email || dataChecked.password !== password) {
    return {
      status: BAD_REQUEST,
      message: 'Campos inválidos',
      isError: true,
    };
  }
  return dataChecked;
};

const usersCreate = async ({ displayName, email, password, image }) => {
  const newUser = await Users.create({ displayName, email, password, image });

  return newUser;
};

const deleteUsers = async (email) => {
  const deleteUser = await Users.destroy({ where: { email } });

  return deleteUser;
};

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmailAndPassword,
  usersCreate,
  deleteUsers,
};
