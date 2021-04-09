const jwt = require('jsonwebtoken');

const secret = 'JSONTrybeerSecret@2021';

const ValidateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_err) {
    return null;
  }
};

module.exports = ValidateToken;
