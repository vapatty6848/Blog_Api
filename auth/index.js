const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = 'nosso segredo do jwt';
const Unauthorized = 401;

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
    return jwt.verify(token, secret); // verify ou decode além de verificar pega o payload original
  } catch (_e) {
    return null;
  }
};

const validateToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(Unauthorized).json({ message: 'missing auth token' });

  req.payload = verifyToken(token);

  if (!req.payload) return res.status(Unauthorized).json({ message: 'jwt malformed' });

  return next();
};

module.exports = {
  createToken,
  verifyToken,
  validateToken,
};
