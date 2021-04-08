const jwt = require('jsonwebtoken');

const secret = 'secret';

const headers = {
  algorithm: 'HS256',
  expiresIn: '2d',
};

const createToken = (userInfo) => {
  const token = jwt.sign(userInfo, secret, headers);
  return token;
};

module.exports = createToken;
