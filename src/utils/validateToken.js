const jwt = require('jsonwebtoken');
const AppError = require('../error/AppError');

function validateToken(token) {
  const secret = 'secret';
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.log(err);
    throw AppError('Token expirado ou inválido', 401);
  }
}

module.exports = validateToken;
