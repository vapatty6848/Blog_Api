const jwt = require('jsonwebtoken');
const { userService } = require('../services');
require('dotenv').config();

const SECRET = process.env.SECRET || 'mySecretToken';
const CONFIG = { algorithm: 'HS256', expiresIn: '7d' };

const { UNAUTHORIZED } = require('../schema/statusSchema');

const createToken = (user) => {
  const { email, displayName } = user;
  const payload = { email, displayName };

  return jwt.sign(payload, SECRET, CONFIG);
};

const verifyToken = async (token) => {
  if (!token) return { message: 'Token não encontrado' };
  try {
    const decodedToken = jwt.verify(token, SECRET);
    const { email } = decodedToken;

    const user = await userService.getByEmail(email);
    if (user === null) return { message: 'Token não encontrado' };

    return { user };
  } catch (error) {
    return { message: 'Token expirado ou inválido' };
  }
};

const validateToken = async (req, res, next) => {
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

  req.user = validation.user;

  next();
};

module.exports = {
  createToken,
  verifyToken,
  validateToken,
};
