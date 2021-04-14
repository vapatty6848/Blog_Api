const { sign } = require('jsonwebtoken');
const authConfig = require('../config/auth');

const { User } = require('../database/models');

module.exports = {
  async execute({ email }) {
    const userByEmail = await User.findOne({ where: { email } });

    if (userByEmail) {
      const token = sign({}, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn,
      });

      return token;
    }

    return false;
  },
};
