const jwt = require('jsonwebtoken');

const secret = 'Api_Blog-Posts';

const headers = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (payload) => jwt.sign(payload, secret, headers);

module.exports = createToken;
