const validateToken = require('../auth/validateToken');

const checkAuthorization = (req, res, next) => {
  const unauthorized = 401;
  const { authorization: token } = req.headers;
  console.log('toekn', token, req.headers);
  const payload = validateToken(token);
  if (!token) return res.status(unauthorized).json({ message: 'Token não encontrado' });
  if (!payload) return res.status(unauthorized).json({ message: 'Token expirado ou inválido' });
  req.payload = token; // deixa valor do payload no req.
  next();
};

module.exports = checkAuthorization;
