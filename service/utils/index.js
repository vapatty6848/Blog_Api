const jwt = require('jsonwebtoken');

const secret = 'ShalalalalaShalalaInTheMorning';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = ({ id, displayName }) => {
  const token = jwt.sign({ id, displayName }, secret, jwtConfig);
  return token;
};

module.exports = {
  secret,
  generateToken,
};
