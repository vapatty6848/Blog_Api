const jwt = require('jsonwebtoken');

function tokenGenerator(user) {
  const SECRET = 'senha';

  const jwtConfig = {
    expiresIn: '3h',
    algorithm: 'HS256',
  };

  const payload = {
    iss: 'BlogsAPI',
    aud: 'indentity',
    userData: user,
  };

  return jwt.sign(payload, SECRET, jwtConfig);
}

module.exports = tokenGenerator;
