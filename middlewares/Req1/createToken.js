const jwt = require('jsonwebtoken');

const secret = 'half-moon-plus-square';

const jwtSetup = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtSetup);

module.exports = createToken;
