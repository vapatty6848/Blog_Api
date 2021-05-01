const jwt = require('jsonwebtoken');

const secret = 'meu-segredo';
const unauthorized = 401;

const tokenValidate = (req, res, next) => {
  const { method } = req;
  if (method === 'GET') {
    const { authorization } = req.headers;

    if (!authorization) {
      const message = 'Token não encontrado';

      return res.status(unauthorized).json({ message });
    }
    try {
      jwt.verify(authorization, secret);

      return next();
    } catch (error) {
      const message = 'Token expirado ou inválido';

      console.log(error);
      return res.status(unauthorized).json({ message });
    }
  }
  next();
};

module.exports = {
  tokenValidate,
};
