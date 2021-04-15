const jwt = require('jsonwebtoken');

function generateToken(payload, expirationTime = '20d') {
  console.log('token generated, valid for: ', expirationTime);
  const secret = 'secret';
  const token = jwt.sign(payload, secret, { expiresIn: expirationTime });
  return token;
}

module.exports = generateToken;
