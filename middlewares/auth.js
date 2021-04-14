require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../helper/statusCodes');

const SECRET = 'segredo';
const config = { algorithm: 'HS256', expiresIn: '7d' };

const createToken = (payload) => jwt.sign(payload.dataValues, SECRET, config);
const verifyToken = (token) => jwt.verify(token, SECRET);

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(UNAUTHORIZED).send({ message: 'Token não encontrado' });
  }
  try {
    const payload = verifyToken(req.headers.authorization, SECRET);
    req.payload = payload;
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = {
  createToken,
  verifyToken,
  SECRET,
  config,
  validateToken,
};
