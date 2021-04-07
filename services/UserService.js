const { Users } = require('../models');
const { createToken } = require('../middlewares/CheckToken');

const create = async ({ displayName, email, password, image }) => {
  const user = { displayName, email, password, image };

  const userCreated = await Users.create(user);
  const token = await createToken(userCreated);
  return token;
};

// const getOne = async (id) => {
//   const getUser = await Users.findOne({ where: { id } });
//   if (!getUser) throw new Error('C_ERR_USER_NOT_FOUND');
//   return getUser;
// };

const getAll = async () => {
  const users = await Users.findAll();
  return users;
};

const getByEmail = async (email) => {
  const user = await Users.findAll({ where: { email } });
  return user;
};

// const removeOne = async (id) => {
//   const removeUser = await Users.destroy({ where: { id } });
//   if (!removeUser) throw new Error('C_ERR_USER_NOT_FOUND');
//   return null;
// };

module.exports = {
  create,
  getAll,
  getByEmail,
};
