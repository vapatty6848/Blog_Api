require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWTSECRET || 'mysectrettoken';
const jwtHeader = { algorithm: 'HS256' };

module.exports = function generateToken(payload) {
  const token = jwt.sign(payload, secret, jwtHeader);
  return token;
};
