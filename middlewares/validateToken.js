const { verifyToken } = require('../security');

module.exports = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });
    const { sub } = verifyToken(token);
    req.userId = sub;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
