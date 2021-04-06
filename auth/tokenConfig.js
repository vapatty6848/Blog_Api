const jwt = require('jsonwebtoken');

const secret = 'segredo-aplicacao';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (payload) => {
  const token = jwt.sign(payload.dataValues, secret, headers);

  return token;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  const payload = verifyToken(authorization);

  if (!payload) return res.status(401).json({ message: 'Token expirado ou inválido' });

  next();
};

module.exports = {
  createToken,
  validateToken,
};
