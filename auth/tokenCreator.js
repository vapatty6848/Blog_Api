const jwt = require('jsonwebtoken');

const secret = 'Pão de Bataaata';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const tokenCreator = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

module.exports = tokenCreator;
