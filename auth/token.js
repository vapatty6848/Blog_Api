require('dotenv').config();

const UNAUTHORIZED = 401;

const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'mySecretKey';
const config = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (email) => {
  const token = jwt.sign({ user: { email } }, config, SECRET);
  return token;
};

const validateToken = async (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    request.user = decoded.user;
  } catch (err) {
    return response.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = { createToken, validateToken };
