const validateToken = require('../auth/validateToken');

const statusUnauthorized = 401;

const verifyAuthorization = (req, res, next) => {
  const { authorization: token } = req.headers;
  console.log(token);

  if (!token) return res.status(statusUnauthorized).json({ message: 'Token não encontrado' });

  const payload = validateToken(token);

  if (!payload) return res.status(statusUnauthorized).json({ message: 'Token expirado ou inválido' });

  next();
};

module.exports = verifyAuthorization;
