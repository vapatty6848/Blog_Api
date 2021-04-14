const jwt = require('jsonwebtoken');

const secret = 'secretkey';

const createToken = (payload) => {
  const headers = {
    algorithm: 'HS256',
    expiresIn: '20m',
  };
  return jwt.sign(payload, secret, headers);
};

module.exports = createToken;
