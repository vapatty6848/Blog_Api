const { Users } = require('../models');
const validEmail = require('./validEmail');

const errStatus = 400;
const errUserExist = 409;
const displayLength = 8;
const passLength = 6;
const emailMinLength = 0;
const passMinLength = 0;

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
  if (validEmail(email) !== true) {
    return res.status(errStatus).json({ message: '"email" must be a valid email' });
  }
  if (!password) {
    return res.status(errStatus).json({ message: '"password" is required' });
  }
  if (password.length < passLength) {
    return res.status(errStatus).json({ message: '"password" length must be 6 characters long' });
  }
  const getEmail = await Users.findAll({ where: { email }});
  if (getEmail) res.status(errUserExist).json({ message: 'Usuário já existe' });
  next();
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(errStatus).json({ message: '"email" is required' });
  }
  if (email.length <= emailMinLength) {
    return res.status(errStatus).json({ message: '"email" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(errStatus).json({ message: '"password" is required' });
  }
  if (password.length <= passMinLength) {
    return res.status(errStatus).json({ message: '"password" is not allowed to be empty' });
  }
  const emailValido = await Users.findAll({ where: email });
  if (!emailValido) {
    res.status(errStatus).json({ message: 'Campos inválidos' });
  }
  next();
};

module.exports = {
  postValidation,
  loginValidation,
};
