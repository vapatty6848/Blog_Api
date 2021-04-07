const tokenValidation = require('../JWT/tokenValidation');
const { UNAUTHORIZED } = require('../utils/allStatusCode');

const VerifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  const payload = tokenValidation(authorization);
  req.user = payload;

  if (!payload) return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });

  next();
};

module.exports = VerifyAuthorization;
