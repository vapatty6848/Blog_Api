const jwt = require('jsonwebtoken');

const SECRET = 'segredo';

const generateToken = (email, id) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { email, id } }, SECRET, jwtConfig);

  return token;
};

module.exports = generateToken;
