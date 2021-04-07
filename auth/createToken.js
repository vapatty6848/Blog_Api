const jwt = require('jsonwebtoken');

const secret = 'blogsecret1234';

module.exports = (payload) => {
  const headers = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  return jwt.sign(payload, secret, headers);
};
