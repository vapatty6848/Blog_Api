const jwt = require('jsonwebtoken');

const SECRET = 'CanYouKeepASecret';
const config = { algorithm: 'HS256', expiresIn: '7d' };

const UNAUTHORIZED = 401;

const createToken = (payload) => {
  const { email, displayName, id } = payload.dataValues;
  return jwt.sign({ email, displayName, id }, SECRET, config);
};

const verifyToken = (token) => jwt.verify(token, SECRET);

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    
    return res.status(UNAUTHORIZED).json(
      {
        message: 'Token não encontrado'
      });
  }
  try {
    const payload = verifyToken(authorization, SECRET);
    req.payload = payload;
  } catch (error) {

    return res.status(UNAUTHORIZED).json(
      {
        message: 'Token expirado ou inválido'
      });
  }

  return next();
};

module.exports = {
  createToken,
  verifyToken,
  tokenValidation,
  SECRET,
};