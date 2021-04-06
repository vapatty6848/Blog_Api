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

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    const decoded = jwt.verify(authorization, secret);
    req.decodedUser = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  createToken,
  validateToken,
};
