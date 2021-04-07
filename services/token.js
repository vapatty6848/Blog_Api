const jwt = require('jsonwebtoken');

const secret = 'ManoEsseÉOSegredoMaisSecretoQExiste';
const jwtConfig = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const createToken = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

const decodeToken = (token) => {
  const user = jwt.verify(token, secret, (err, decoded) => {
    if (err) return 'err';
    return decoded.data;
  });

  return user;
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  const isValid = jwt.verify(authorization, secret, (err) => {
    if (err) return 'err';
  });

  if (isValid === 'err') return res.status(401).json({ message: 'Token expirado ou inválido' });

  next();
};

module.exports = {
  createToken,
  validateToken,
  decodeToken,
};
