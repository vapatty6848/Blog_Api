const jwt = require('jsonwebtoken');

const AppError = require('../errors/AppError.js');
const { UNAUTHORIZED } = require('../errors/status');
const authConfig = require('../config/auth.js');

const errorMsg = 'Token não encontrado';
const invalidJWT = 'Token expirado ou inválido';

function ensureAuth(request, response, next) {
  const token = request.headers.authorization;

  if (!token) throw new AppError(errorMsg, UNAUTHORIZED);

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    const { id } = decoded;

    request.user = { id };

    return next();
  } catch {
    throw new AppError(invalidJWT, UNAUTHORIZED);
  }
}

module.exports = ensureAuth;
