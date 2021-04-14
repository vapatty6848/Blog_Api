const jwt = require('jsonwebtoken');

const secret = 'secretkey';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = validateToken;
