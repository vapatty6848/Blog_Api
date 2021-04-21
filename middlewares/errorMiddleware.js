const { JsonWebTokenError } = require('jsonwebtoken');
const AppError = require('../utils/appErrors');

module.exports = (err, _req, res, _next) => {
  const { code, message } = err;
  console.error(err);

  if (err instanceof AppError) return res.status(code).json({ message });
  if (err instanceof JsonWebTokenError) return res.status(401).json({ message: 'Token expirado ou inválido' });

  return res.status(500).json({ message: 'Internal Server Error' });
};