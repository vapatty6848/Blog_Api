const jwt = require('jsonwebtoken');

const SECRET = 'my&7Ip$xk6PIsDL';

const generateToken = (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, SECRET, jwtConfig);

  return token;
};

module.exports = generateToken;
