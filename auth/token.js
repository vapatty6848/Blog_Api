const jwt = require('jsonwebtoken');

const config = { algorithm: 'HS256', expiresIn: '1d' };
const tokenPassword = '123456';

const createToken = (email) => {
  const token = jwt.sign({ user: { email } }, tokenPassword, config);
  return token;
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, tokenPassword);
    req.user = decoded.user;
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  next();
};

module.exports = {
  createToken,
  validateToken,
};
