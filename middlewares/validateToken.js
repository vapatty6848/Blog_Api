const verifyToken = require('../auth/verifyToken');

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).send({ message: 'Token não encontrado' });
  }

  // if (typeof token !== 'string') {
  //   return res.status(UNAUTHORIZED).send({ message: 'missing auth token' });
  // }

  const verify = verifyToken(token);

  if (!verify) return res.status(UNAUTHORIZED).send({ message: 'Token expirado ou inválido' });

  next();
};
