const { User } = require('../models');
const { createToken } = require('../utils/token');

const validateCreateUser = async (query) => {
  const isUserAlreadyExists = await User.findOne({
    attributes: ['email'],
    where: { email: query.email },
  });

  if (isUserAlreadyExists) return null;

  const userCreated = await User.create(query);
  const { password, email, ...user } = userCreated;

  const token = createToken(user);

  return token;
};

module.exports = {
  validateCreateUser,
};
