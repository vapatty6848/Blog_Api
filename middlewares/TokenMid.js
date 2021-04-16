const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;
const secret = 'Thor is the strongest Avenger';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  try {
    const teste = jwt.verify(authorization, secret);
    req.userData = teste.userData;
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = {
  verifyToken,
};
