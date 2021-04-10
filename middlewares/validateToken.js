const jwt = require('jsonwebtoken');

const secret = 'blog_api';

const validateToken = (token) => {
  try {
    const newtoken = jwt.decode(token, secret);
    return newtoken;
  } catch (e) {
    return null;
  }
};
module.exports = validateToken;
