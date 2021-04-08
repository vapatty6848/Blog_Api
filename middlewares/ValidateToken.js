const jwt = require('jsonwebtoken');

const secret = 'theIncredibleSecret';
const UNAUTHORIZED = 401;

const validateToken = (req, res, next) => {
  const { method } = req;
  if (method === 'GET') {
    const { authorization } = req.headers;

    if (!authorization) {
      const message = 'Token não encontrado';

      return res.status(UNAUTHORIZED).json({ message });
    }
    try {
      jwt.verify(authorization, secret);

      return next();
    } catch (error) {
      const message = 'Token expirado ou inválido';

      console.log(error);
      return res.status(UNAUTHORIZED).json({ message });
    }
  }
  next();
};

module.exports = {
  validateToken,
};
