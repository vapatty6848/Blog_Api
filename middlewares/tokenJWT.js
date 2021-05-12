const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET || 'milhoVerde';

const createToken = (user) => {
  const { password: _, ...payload } = user;
  const configRole = {
    expiresIn: '6h',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, configRole);
  return token;
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = jwt.verify(authorization, secret);
    req.payload = payload;
    return next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  createToken,
  verifyToken,
};
