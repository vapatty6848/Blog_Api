const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'mysecrettoken';

module.exports = async (user) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return token;
};
