const jwt = require('jsonwebtoken');
const { User } = require('../models');

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
const secret = process.env.JWT_SECRET || 'segredo';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createStatus = (message, status) => ({ message, status });

const nameVerification = (req, _res, next) => {
  const { displayName } = req.body;
  if (!displayName) return next(createStatus('Invalid entries. Try again.', 400));

  if (displayName.length <= 8) {
    return next(createStatus('"displayName" length must be at least 8 characters long', 400));
  }

  next();
};

const passwordVerification = (req, _res, next) => {
  const { password } = req.body;
  if (!password) return next(createStatus('"password" is required', 400));

  if (password.length < 6) return next(createStatus('"password" length must be 6 characters long', 400));

  next();
};

const emailVerification = async (req, _res, next) => {
  const { email } = req.body;

  if (!email) return next(createStatus('"email" is required', 400));

  if (!emailRegex.test(email)) return next(createStatus('"email" must be a valid email', 400));

  const verifyEmail = await User.findOne({ where: { email } });

  if (verifyEmail) return next(createStatus('Usuário já existe', 409));

  next();
};

const createToken = (req, res, next) => {
  const { email } = req.body;
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  req.token = token;
  next();
};

module.exports = {
  nameVerification,
  emailVerification,
  passwordVerification,
  createToken,
};
