const jwt = require('jsonwebtoken');

const secret = 'Pão de Bataaata';

const tokenValidator = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_e) {
    return null;
  }
};

module.exports = tokenValidator;
