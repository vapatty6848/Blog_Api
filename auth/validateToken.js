const jwt = require('jsonwebtoken');

const unauthorized = 401;

const secret = 'segredo';

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') return res.status(unauthorized).json({ message: 'Token não encontrado' });

  try {
    const decoded = jwt.verify(authorization, secret);
    req.decodedUser = decoded;
    next();
  } catch (error) {
    res.status(unauthorized).json({ message: 'Token expirado ou inválido' });
  }
};
