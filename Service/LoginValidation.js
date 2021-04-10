const { User } = require('../models');

const createError = (message, status) => ({ message, status });

const passwordVerification = (req, _res, next) => {
  const { password } = req.body;
  if (!password && password !== '') return next(createError('"password" is required', 400));

  if (password === '') return next(createError('"password" is not allowed to be empty', 400));

  next();
};

const emailLoginVerification = async (req, _res, next) => {
  const { email, password } = req.body;

  if (!email && email !== '') return next(createError('"email" is required', 400));

  if (email === '') return next(createError('"email" is not allowed to be empty', 400));

  const verifyEmail = await User.findOne({ where: { email, password } });

  if (!verifyEmail) return next(createError('Campos inválidos', 400));
  req.info = verifyEmail;

  next();
};

module.exports = {
  passwordVerification,
  emailLoginVerification,
};
