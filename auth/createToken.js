const jwt = require('jsonwebtoken');

const secret = 'secretBlogApi';

const headers = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const create = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

module.exports = create;
