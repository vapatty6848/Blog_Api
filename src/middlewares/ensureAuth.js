const { verify } = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;

const { session } = require('../config/auth');
const AppError = require('../utils/AppError');

function ensureAuth(req, _res, next) {
  const token = req.headers.authorization;

  if (!token) throw new AppError('Token não encontrado', UNAUTHORIZED);

  try {
    const decoded = verify(token, session.secret);

    const { id, email } = decoded;

    req.user = { id, email };

    return next();
  } catch (error) {
    throw new AppError('Token expirado ou inválido', UNAUTHORIZED);
  }
}

module.exports = ensureAuth;
