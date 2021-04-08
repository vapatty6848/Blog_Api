const jwt = require('express-jwt');
const secret = require('./secret');

const validateToken = () => jwt({
  secret: secret,
  algorithms: ['HS256'],
  getToken: (req) => {
    if (req.headers.authorization) {
      return req.headers.authorization;
    }
    return null;
  },
});

module.exports = validateToken;
