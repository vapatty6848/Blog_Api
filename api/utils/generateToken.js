const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = 'Asnajsbajb65675xb8327fASKJ283N';
const jwtSecret = process.env.JWT_SECRET || secret;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, jwtConfig);
  return token;
};

module.exports = generateToken;
