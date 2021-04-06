const jwt = require('jsonwebtoken');

const secret = 'hashzaoGigante';

const headers = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, secret);
  return decodedToken;
};

module.exports = {
  createToken,
  verifyToken,
};
