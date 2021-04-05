const { users, utils } = require('../models');
const { generateToken } = require('../security');
const { authRegisterUser, utils: { validateUserName } } = require('../schemas');

const create = async (body) => {
  const data = body;
  const { name, email } = data;

  const [isEmailAvailable] = await utils.getByFilter({
    table: 'users',
    filter: 'email',
    value: email,
  });
  authRegisterUser(data, isEmailAvailable);

  data.role = (data.isVendor) ? 'administrator' : 'client';
  const newUserId = await users.insertNewUser(data);

  const token = generateToken(newUserId, data.role);
  const { role } = data;
  return { name, email, token, role };
};

const updateName = async (name, id) => {
  validateUserName(name);
  return users.updateNameByEmail(name, id);
};

module.exports = {
  create,
  updateName,
};
