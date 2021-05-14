const jwt = require('jsonwebtoken');

const secret = 'segredo';

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === '') return res.status(401).json({ message: 'Token não encontrado' });

  const decoded = jwt.decode(authorization, secret);

  if (!decoded) return res.status(401).json({ message: 'Token expirado ou inválido' });
  req.user = decoded;

  next();
};

module.exports = validateToken;