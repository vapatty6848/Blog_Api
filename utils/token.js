const jwt = require('jsonwebtoken');

const secret = 'root';

const headers = {
  algorithm: 'HS256',
  expiresIn: 30000,
};

const createToken = (paylod) => {
  const token = jwt.sign(paylod, secret, headers);
  return token;
};

module.exports = {
  createToken,
  secret,
};
