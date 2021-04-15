const jwt = require('jsonwebtoken');
const AppError = require('../error/AppError');

function validateToken(token) {
  const secret = 'secret';
  try {
    console.log(token, secret);
    const trueToken = token;
    console.log(trueToken);
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    return decoded;
  } catch (err) {
    console.log(err);
    throw AppError('Token expirado ou inválido', 401);
  }
}

module.exports = validateToken;
