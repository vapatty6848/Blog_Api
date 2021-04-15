const jwt = require('jsonwebtoken');

const senha = 'JWT';
const auth = { algorithm: 'HS256', expiresIn: '7d' };

const createToken = (load) => jwt.sign(load.dataValues, senha, auth);
const verifyToken = (token) => jwt.verify(token, senha);

const validToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = verifyToken(req.headers.authorization, senha);
    req.payload = payload;
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  return next();
};

module.exports = {
  createToken,
  verifyToken,
  senha,
  auth,
  validToken,
};
