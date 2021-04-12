const jwt = require('jsonwebtoken');

const secret = 'half-moon-plus-square';

const validateToken = async (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_error) {
    return null;
  }
};

const usersAuthorized = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  const payload = await validateToken(token);
  if (!payload) return res.status(401).json({ message: 'Token expirado ou inválido' });
  req.user = payload;
  next();
};

module.exports = {
  usersAuthorized,
  validateToken,
};
