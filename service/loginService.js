const { createToken } = require('../utils/token');
const { User } = require('../models');

const loginAuthentication = async (login) => {
  const userFromDatabase = await User.findOne({
    where: { email: login.email },
  });

  if (!userFromDatabase) return null;

  const { password, email, ...user } = userFromDatabase;

  const emailIncorrect = userFromDatabase.email !== login.email;
  const passwordIncorrect = userFromDatabase.password !== login.password;

  if (emailIncorrect || passwordIncorrect) return null;

  const token = createToken(user);

  return token;
};

module.exports = { loginAuthentication };
