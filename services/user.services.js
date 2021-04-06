const { Users } = require('../models');
const { generateToken } = require('../security');
const { authNewUser } = require('../schemas');

const create = async ({ displayName, email, password, image }) => {
  const user = { displayName, email, password, image };
  authNewUser(user);
  const emailIsUsed = await Users.findOne({ where: { email } });
  if (emailIsUsed) throw new Error('C_ERR_EMAIL_IN_USE');

  const newUserId = await Users.create(user);
  const token = generateToken(newUserId);
  return { token };
};

const getOne = async (id) => {
  const getUser = await Users.findOne({ where: { id } });
  if (!getUser) throw new Error('C_ERR_USER_NOT_FOUND');
  return getUser;
};

const getAll = async () => {
  const getUsers = await Users.findAll();
  return getUsers;
};

const removeOne = async (id) => {
  const removeUser = await Users.destroy({ where: { id } });
  if (!removeUser) throw new Error('C_ERR_USER_NOT_FOUND');
  return null;
};

module.exports = {
  create,
  getOne,
  getAll,
  removeOne,
};
