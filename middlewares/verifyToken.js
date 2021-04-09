const validateToken = require('../auth/validateToken');

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({message: 'Token não encontrado'});

  const isToken = validateToken(authorization);
  if (!isToken) return res.status(401).json({message: 'Token expirado ou inválido'});

  next();
};

module.exports = verifyToken;
