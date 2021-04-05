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

module.exports = {
  create,
};
