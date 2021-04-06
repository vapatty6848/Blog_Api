const jwt = require('jsonwebtoken');
const config = require('./config.security');

const generateToken = (id) => {
  const payload = {
    iss: 'blog-api',
    aud: 'blog-api',
    sub: id,
  };

  return jwt.sign(payload, config.jwt.secret, config.jwt.options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (err) {
    throw new Error({ err });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
