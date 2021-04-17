const jwt = require('jsonwebtoken');
const validEmail = require('./validEmail');
const { Users } = require('../models');

const secret = 'cabeça';
const errStatus = 400;
const errUserExist = 409;
const errToken = 401;
const errNotFound = 404;
const displayLength = 8;
const passLength = 6;

const postValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < displayLength) {
    return res.status(errStatus).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (typeof displayName !== 'string') {
    return res.status(errStatus).json({ message: '"displayName" must be a string' });
  }
  if (!email) {
    return res.status(errStatus).json({ message: '"email" is required' });
  }
  if (!validEmail(email)) {
    return res.status(errStatus).json({ message: '"email" must be a valid email' });
  }
  if (!password) {
    return res.status(errStatus).json({ message: '"password" is required' });
  }
  if (password.length < passLength) {
    return res.status(errStatus).json({ message: '"password" length must be 6 characters long' });
  }
  const getEmail = await Users.findOne({ where: { email } });
  if (getEmail) return res.status(errUserExist).json({ message: 'Usuário já existe' });
  next();
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') {
    return res.status(errStatus).json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(errStatus).json({ message: '"email" is required' });
  }
  if (password === '') {
    return res.status(errStatus).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(errStatus).json({ message: '"password" is required' });
  }
  if (!validEmail(email)) {
    return res.status(errStatus).json({ message: 'Campos inválidos' });
  }
  next();
};

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(errToken).json({ message: 'Token não encontrado' });
  }
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    if (error) {
      return res.status(errToken).json({ message: 'Token expirado ou inválido' });
    }
  }
};

const userIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const userId = await Users.findByPk(id);
  if (!userId) {
    return res.status(errNotFound).json({ message: 'Usuário não existe' });
  }
  if (!token) {
    return res.status(errToken).json({ message: 'Token não encontrado' });
  }
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    if (error) {
      return res.status(errToken).json({ message: 'Token expirado ou inválido' });
    }
  }
};

module.exports = {
  postValidation,
  loginValidation,
  tokenValidation,
  userIdValidation,
};
