const jwt = require('jsonwebtoken');

const secret = 'meu-segredo';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (email, password) => {
  const token = jwt.sign({ data: [email, password] }, secret, jwtConfig);
  return token;
};

module.exports = {
  createToken,
};
