const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'segredo';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createError = (message, status) => ({ message, status });

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const allUsersverification = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(createError('Token não encontrado', 401));
  }
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return next(createError('Token expirado ou inválido', 401));
    }
    req.myUser = decoded;
  });

  next();
};

module.exports = {
  createToken,
  allUsersverification,
};
