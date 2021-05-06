const { User } = require('../models');
const { createToken } = require('../utils/token');

const validateCreateUser = async (query) => {
  // const isUserAlreadyExists = await UserModel.findOne({
  //   attributes: ['email'],
  //   where: { email: query.email },
  // });

  // if (isUserAlreadyExists.includes(query.email)) return null;

  const userCreated = await User.create(query);
  const { password, email, ...user } = userCreated;

  const token = createToken(user);

  return token;
};

module.exports = {
  validateCreateUser,
};
