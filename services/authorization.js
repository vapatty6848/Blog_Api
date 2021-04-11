const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRETKEY = process.env.SECRETKEY || 'M1P455W0RD';
const config = { algorithm: 'HS512', expiresIn: '1d' };

const createToken = (payload) => jwt.sign(payload.dataValues, SECRETKEY, config);

const verifyToken = (token) => jwt.verify(token, SECRETKEY);

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = verifyToken(req.headers.authorization, SECRETKEY);
    req.payload = payload;
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  return next();
};

module.exports = {
  createToken,
  verifyToken,
  validateToken,
};
