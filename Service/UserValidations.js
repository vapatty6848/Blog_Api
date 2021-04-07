const jwt = require('jsonwebtoken');
const { User } = require('../models');

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
const secret = 'segredo';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createError = (message, status) => ({ message, status });

const nameVerification = (req, _res, next) => {
  const { displayName } = req.body;
  if (!displayName) {
    next(createError('Invalid entries. Try again.', 400));
  }
  if (displayName.length <= 8) {
    next(createError('"displayName" length must be at least 8 characters long', 400));
  }
  console.log('name validation'); // aparece esse console
  next();
};

const passwordVerification = (req, _res, next) => {
  const { password } = req.body;
  if (!password) {
    next(createError('"password" is required', 400));
  }
  if (password.length < 6) {
    next(createError('"password" length must be 6 characters long', 400));
  }
  console.log('password validation'); // não aparece esse console
  next();
};

const emailVerification = async (req, _res, next) => {
  const { email } = req.body;
  console.log(email); // aparece esse console
  console.log(User);
  if (!email) {
    next(createError('"email" is required', 400));
  }
  if (!emailRegex.test(email)) {
    next(createError('"email" must be a valid email', 400));
  }

  const verifyEmail = await User.findOne({ where: { email } });
  if (verifyEmail) {
    next(createError('Usuário já existe', 409));
  }
  console.log('email validation'); // não aparece esse console
  next();
};

const createToken = (req, res, next) => {
  const { email } = req.body;
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  res.status(200).json({ token });
  next();
};

module.exports = {
  nameVerification,
  emailVerification,
  passwordVerification,
  createToken,
};
