const jwt = require('jsonwebtoken');

const SECRET = 'senha';

const jwtConfig = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

function tokenGenerator(user) {
  const payload = {
    iss: 'BlogsAPI',
    aud: 'indentity',
    userData: user,
  };
  return jwt.sign(payload, SECRET, jwtConfig);
}

function getTokenUser(token) {
  const decode = jwt.verify(token, SECRET, jwtConfig);
  return decode.userData;
}

module.exports = {
  tokenGenerator, getTokenUser,
};
