const jwt = require('jsonwebtoken');

const secret = 'BlogAPIproject';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (infoToToken) => {
  const token = jwt.sign(infoToToken, secret, jwtConfig);

  return token;
};

module.exports = createToken;
