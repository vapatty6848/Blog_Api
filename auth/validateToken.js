const jwt = require('jsonwebtoken');
const UserService = require('../service/UserService');

const UNAUTHORIZED = 401;
const secret = 'projectBlogsApi';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.findEmail(decoded.email);
    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  validateToken,
};
