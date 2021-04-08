const jwt = require('jsonwebtoken');

const mySecretKey = 'Hey-Ho!';
const header = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (newUser) => {
  const token = jwt.sign(newUser, mySecretKey, header);

  return token;
};

module.exports = createToken;
