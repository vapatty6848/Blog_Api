const jwt = require('jsonwebtoken');
const { secret } = require('../auth/TokenValidation');

const tokenCreator = (user) => {
  const { id, displayName, email } = user;
  const payload = { id, displayName, email };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return token;
};

module.exports = tokenCreator;
