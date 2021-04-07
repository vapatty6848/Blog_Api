const jwt = require('jsonwebtoken');

const secret = 'blogsecret1234';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
