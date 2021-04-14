const jwt = require('jsonwebtoken');
const config = require('./TokenConfig');

const createToken = (payload) => {
  const token = jwt.sign(payload, config.secret, config.jwtConfig);
  return token;
};

module.exports = {
  createToken,
};
