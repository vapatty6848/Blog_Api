const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateJWT(payload) {
  const { expiresIn, secret } = authConfig.jwt;
  const jwtPayload = { expiresIn };
  const token = jwt.sign(payload, secret, jwtPayload);

  return token;
}

module.exports = generateJWT;
