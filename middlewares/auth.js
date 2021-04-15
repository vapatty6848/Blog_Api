require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.SECRET || 'my_secret';

const jwtHeaders = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

const createToken = (displayName, email) => {
  const payload = { displayName, email };
  const token = jwt.sign(payload, jwtSecret, jwtHeaders);
  return token;
};

module.exports = {
  createToken,
};
