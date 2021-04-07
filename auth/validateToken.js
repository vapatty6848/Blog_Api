const jwt = require('jsonwebtoken');

const secret = 'secretBlogApi';

const validateToken = (token) => {
  try {
    const checkToken = jwt.verify(token, secret);
    return checkToken;
  } catch (_err) {
    return null;
  }
};

module.exports = validateToken;
