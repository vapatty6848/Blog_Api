const jwt = require('jsonwebtoken');

const SECRET = 'segredo';

const generateToken = async (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, SECRET, jwtConfig);

  return token;
};

module.exports = generateToken;
