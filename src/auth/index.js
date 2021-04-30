require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'project-blogs-api';

const createToken = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '30m',
  };

  const token = jwt.sign(payload, secret, options);

  return token;
};

const validateToken = (token) => {
  const verifiedToken = jwt.verify(token, secret);

  return verifiedToken;
};

module.exports = { validateToken, createToken };
