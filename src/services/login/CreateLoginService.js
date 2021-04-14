const { sign } = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const { User } = require('../../database/models');

module.exports = {
  async execute({ email }) {
    const userByEmail = await User.findOne({ where: { email } });

    if (userByEmail) {
      const data = userByEmail.dataValues;

      const token = sign({ data }, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn,
        algorithm: 'HS256',
      });

      return token;
    }

    return false;
  },
};
