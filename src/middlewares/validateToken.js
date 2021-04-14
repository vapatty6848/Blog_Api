const jwt = require('jsonwebtoken');

const { UNAUTHORIZED } = require('../errors/status');
const authConfig = require('../config/auth.js');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });

    const decoded = jwt.verify(authorization, authConfig.jwt.secret);

    const { id } = decoded;

    req.user = { id };

    return next();
  } catch {
    return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
};
