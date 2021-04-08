const jwt = require('jsonwebtoken');

const secret = 'H4ck3r5-W1ll-D0m41n-3v3ry7h1n6';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (payload) => jwt.sign(payload, secret, headers);

module.exports = {
  createToken,
  secret,
};
