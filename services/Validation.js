const { User } = require('../models');

const BAD_REQUEST = 400;
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
  const user = await User.findOne({ where: { email } });
  if (password === user.dataValues.password) {
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
  if (email === undefined) {
    return res.status(BAD_REQUEST).send({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(BAD_REQUEST).send({ message: '"password" is required' });
  }
  if (email === '') {
    return res.status(BAD_REQUEST).send({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(BAD_REQUEST).send({ message: '"password" is not allowed to be empty' });
  }
  if (!loginOK) {
    return res.status(BAD_REQUEST).send({ message: 'Campos inválidos' });
  }
  next();
};

module.exports = {
  validateCreateUser,
  validateLogin,
};
