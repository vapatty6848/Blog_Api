const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'segredo';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = {
  createToken,

};
