const jwt = require('jsonwebtoken');

const secret = 'blogapi';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
