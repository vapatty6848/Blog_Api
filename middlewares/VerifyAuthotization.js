const tokenDecoder = require('../utils/tokenDecoder');
const status = require('../utils/allStatusCode');

const VerifyAuthotization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  const payload = tokenDecoder(authorization);
  req.user = payload;

  if (!payload) return res.status(status.UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });

  next();
};

module.exports = VerifyAuthotization;
