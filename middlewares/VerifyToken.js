const jwt = require('jsonwebtoken');
const { secret } = require('../services/JwtToken');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    jwt.verify(authorization, secret);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = verifyToken;
