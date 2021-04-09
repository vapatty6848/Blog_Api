const ValidateToken = require('../auth/ValidateToken');

const TokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  const isValid = ValidateToken(authorization);
  if (!isValid) return res.status(401).json({ message: 'Token expirado ou inválido' });
  next();
};

module.exports = TokenValidation;
