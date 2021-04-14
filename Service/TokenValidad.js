const jwt = require('jsonwebtoken');
const config = require('./TokenConfig');

const createError = (message, status) => ({ message, status });

const allUsersverification = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(createError('Token não encontrado', 401));
  }
  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return next(createError('Token expirado ou inválido', 401));
    }
    req.myUser = decoded;
  });

  next();
};

module.exports = {
  allUsersverification,
};
