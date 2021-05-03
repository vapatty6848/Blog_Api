const decodeToken = require('../auth/decodeToken');

const UNAUTHORIZED = 401;
const MISSING_BAD_MESSAGE = 'Token não encontrado';
const INVALID_TOKEN = 'Token expirado ou inválido';

async function tokenIsValid(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(UNAUTHORIZED).json({ message: MISSING_BAD_MESSAGE });

  const payload = await decodeToken(authorization);
  if (!payload) return res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN });
  req.user = payload;

  next();
}

module.exports = tokenIsValid;
