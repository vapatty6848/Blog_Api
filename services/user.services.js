const { Users } = require('../models');
const { generateToken } = require('../security');
const { authNewUser } = require('../schemas');

const create = async ({ displayName: name, email, password, image }) => {
  const user = { name, email, password, image };
  const emailIsUsed = await Users.findOne({ where: { email } });

  authNewUser(user, emailIsUsed);

  const newUserId = await Users.create(user);
  const token = generateToken(newUserId);
  return { token };
};

module.exports = {
  create,
};
