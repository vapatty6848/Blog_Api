const { User } = require('../models');
const schema = require('../schema');
const { generateToken } = require('../security');
const userValidator = require('../validations/user.validation');

const createUser = async (displayName, email, password, image) => {
  userValidator(displayName, email, password);

  const user = await User.findOne({ where: { email } });
  if (user) throw new Error(schema.user);

  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
  return generateToken(email, id);
};

module.exports = {
  createUser,
};
