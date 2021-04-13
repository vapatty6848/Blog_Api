const { sign } = require('jsonwebtoken');
const authConfig = require('../config/auth');

const { User } = require('../database/models');

module.exports = {
  async execute({ email, displayName, password, image }) {
    await User.create({
      displayName,
      image,
      password,
      email,
    });

    const token = sign({}, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return token;
  },
};
