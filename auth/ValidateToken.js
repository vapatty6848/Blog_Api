const jwt = require('jsonwebtoken');

const secret = 'Thor is the strongest Avenger';

const jwtSign = (payload, jwtSecret, jwtConfig) => (
  jwt.sign(payload, jwtSecret, jwtConfig)
);

const jwtConfig = {
  expiresIn: '150m',
  algorithm: 'HS256',
};

const createJWTPayload = (user) => ({
  iss: 'MarvelApp',
  aud: 'indentity',
  userData: user,
});

// const jwtSignClone = (payload) => (
//   jwt.sign(payload, secret, jwtConfig)
// );

// const jwtVerifyClone = (token) => jwt.verify(token, secret);

module.exports = {
  secret,
  jwtConfig,
  createJWTPayload,
  jwtSign,
};
