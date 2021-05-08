const { sign } = require('jsonwebtoken');

const { session } = require('../config/auth');

function generatedToken(payload) {
  const { expiresIn, secret } = session;
  return sign(payload, secret, { expiresIn });
}

module.exports = generatedToken;
