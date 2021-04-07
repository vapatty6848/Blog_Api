const UserService = require('../service/UserService');

const EIGHT = 8;
const BAD_REQUEST = 400;
const CONFLICT = 409;

const validateName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < EIGHT) {
    return res.status(BAD_REQUEST).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  const emailIsValid = emailFormat.test(email);
  if (email === undefined) {
    return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  }
  if (email === '') {
    return res.status(BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  }
  if (!emailIsValid) {
    return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  }
  if (password === '') {
    return res.status(BAD_REQUEST).json({ message: '"password" is not allowed to be empty' });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const emailFound = await UserService.findEmail(email);

  /*   if (!emailFound) {
    return res.status(BAD_REQUEST).json({ message: 'Campos inválidos' });
  } */

  if (emailFound.length !== 0) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }

  next();
};

const unknownUser = async (req, res, next) => {
  const { email } = req.body;
  const emailFound = await UserService.findEmail(email);

  if (!emailFound) {
    return res.status(BAD_REQUEST).json({ message: 'Campos inválidos' });
  }
  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  unknownUser,
  emailExists,
};
