const { verifyToken } = require('./Auth');
const { User } = require('../models');
const { BlogPosts } = require('../models');

const SUCCESS = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;

const isBlank = (field) => !field || field === '';

const displayNameLength = (field) => field.length < 8;

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return !regex.test(email);
};

const uniqueEmail = async (email) => {
  if (!email) return false;
  const userExist = await User.findAll({ where: { email } });
  if (userExist.length > 0) {
    return true;
  }
  return false;
};

const loginCorrect = async (email, password) => {
  if (!email || !password) return false;
  const user = await User.findAll({ where: { email } });
  if (user.length === 0) return false;
  if (password === user[0].dataValues.password) {
    return true;
  }
  return false;
};

const passwordInvalid = (field) => field.length < 6;

const validateCreateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const unqEmail = await uniqueEmail(email);
  switch (true) {
    case displayNameLength(displayName):
      return res.status(BAD_REQUEST).send({ message: '"displayName" length must be at least 8 characters long' });
    case isBlank(email):
      return res.status(BAD_REQUEST).send({ message: '"email" is required' });
    case validateEmail(email):
      return res.status(BAD_REQUEST).send({ message: '"email" must be a valid email' });
    case unqEmail:
      return res.status(CONFLICT).send({ message: 'Usuário já existe' });
    case isBlank(password):
      return res.status(BAD_REQUEST).send({ message: '"password" is required' });
    case passwordInvalid(password):
      return res.status(BAD_REQUEST).send({ message: '"password" length must be 6 characters long' });
    default:
      next();
  }
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const loginOK = await loginCorrect(email, password);
  if (email === '') {
    return res.status(BAD_REQUEST).send({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(BAD_REQUEST).send({ message: '"email" is required' });
  }
  if (password === '') {
    return res.status(BAD_REQUEST).send({ message: '"password" is not allowed to be empty' });
  }
  if (password === undefined) {
    return res.status(BAD_REQUEST).send({ message: '"password" is required' });
  }
  if (!loginOK) {
    return res.status(BAD_REQUEST).send({ message: 'Campos inválidos' });
  }
  req.status = SUCCESS;
  next();
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  try {
    const decoded = verifyToken(token);
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
    }
    req.user = user.dataValues;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
};

const validatePost = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  if (!content) return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  next();
};

const validateUser = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const postId = await BlogPosts.findAll({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] } }],
    attributes: { exclude: ['userId'] },
  });
  if (postId.length === 0) {
    return res.status(NOT_FOUND).send({ message: 'Post não existe' });
  }
  const idOwner = postId[0].dataValues.user.dataValues.id;
  if (idOwner !== userId) {
    return res.status(UNAUTHORIZED).send({ message: 'Usuário não autorizado' });
  }
  next();
};

module.exports = {
  validateCreateUser,
  validateLogin,
  validateToken,
  validatePost,
  validateUser,
};
