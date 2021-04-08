const { Users } = require('../models');

const generateToken = require('../token/generateToken');

const createUser = async (displayName, email, password, image) => {
  console.log('service users');
  console.log(displayName, email, password, image);

  const userExists = await Users.findOne({ where: { email } });
  if (userExists === null) {
    const createdUser = await Users.create({ displayName, email, password, image });
    const { dataValues: { id } } = createdUser;
    const token = await generateToken({ id, email });
    return { token };
  }

  return { message: 'Usuário já existe' };
};

const getAllUsers = async () => {
  console.log('SERVICE GET ALL USERS');

  const allUsers = await Users.findAll();

  return allUsers;
};

const getById = async (id) => {
  const userById = await Users.findByPk(id);

  if (userById === null) {
    return { message: 'Usuário não existe' };
  }

  return { userById };
};

module.exports = {
  createUser,
  getAllUsers,
  getById,
};
