const jwt = require('jsonwebtoken');

const secret = 'theCoyote';

const jwtSign = (payload, jwtSecret, jwtConfig) => (
  jwt.sign(payload, jwtSecret, jwtConfig)
);

const jwtConfig = {
  expiresIn: '150m',
  algorithm: 'HS256',
};

const createJWTPayload = (user) => ({
  iss: 'theCoyoteApp',
  aud: 'indentity',
  userData: user,
});

module.exports = {
  secret,
  jwtConfig,
  createJWTPayload,
  jwtSign,
};
