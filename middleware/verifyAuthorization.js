const validateToken = require('../Auth/validateToken');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  const payload = validateToken(authorization);
  if (!payload) return res.status(401).json({ message: 'Token expirado ou inválido' });
  req.payload = payload;
  next();
};

module.exports = verifyAuthorization;
