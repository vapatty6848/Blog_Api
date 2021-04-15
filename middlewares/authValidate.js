const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === '') {
    return res.status(UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  }

  const validToken = jwt.decode(authorization);

  if (!validToken) {
    return res.status(UNAUTHORIZED)
      .json({ message: 'Token expirado ou inválido' });
  }
  next();
};
