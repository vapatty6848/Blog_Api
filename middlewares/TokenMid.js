const UNAUTHORIZED = 401;

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  if (authorization.length < 16) return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  next();
};

module.exports = {
  verifyToken,
};
