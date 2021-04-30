const { validateToken } = require('../auth');
const { User } = require('../models');

const createMessage = (message) => ({ message });

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(400).json(createMessage('"email" is not allowed to be empty'));
  }

  if (!email) {
    return res.status(400).json(createMessage('"email" is required'));
  }

  return next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json(createMessage('"password" is not allowed to be empty'));
  }

  if (!password) {
    return res.status(400).json(createMessage('"password" is required'));
  }

  return next();
};

const verifyUserExists = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const { id, displayName, image } = user.dataValues;
  req.user = { email, id, displayName, image };

  return next();
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    req.user = validateToken(token);

    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyUserExists,
  verifyToken,
};
