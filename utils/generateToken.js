const jwt = require('jsonwebtoken');

const secret = 'segredo_blog_api';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = (payload) => jwt.sign(payload, secret, headers);

module.exports = generateToken;
