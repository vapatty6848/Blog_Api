const jwt = require('jsonwebtoken');

const secret = 'half-moon-plus-square';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_error) {
    return null;
  }
};

const usersAuthorized = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const payload = await validateToken(token);
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (!payload) return res.status(401).json({ message: 'Token expirado ou inválido' });
  next();
};

module.exports = {
  usersAuthorized,
};
