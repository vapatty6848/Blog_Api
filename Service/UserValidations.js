const { User } = require('../models');

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

const createError = (message, status) => ({ message, status });

const nameVerification = (req, _res, next) => {
  const { displayName } = req.body;
  if (!displayName) return next(createError('Invalid entries. Try again.', 400));

  if (displayName.length <= 8) {
    return next(createError('"displayName" length must be at least 8 characters long', 400));
  }

  next();
};

const passwordVerification = (req, _res, next) => {
  const { password } = req.body;
  if (!password) return next(createError('"password" is required', 400)); // req2

  if (password.length < 6) return next(createError('"password" length must be 6 characters long', 400));

  next();
};

const emailVerification = async (req, _res, next) => {
  const { email } = req.body;

  if (!email) return next(createError('"email" is required', 400)); // req2

  if (!emailRegex.test(email)) return next(createError('"email" must be a valid email', 400));

  const verifyEmail = await User.findOne({ where: { email } });

  if (verifyEmail) return next(createError('Usuário já existe', 409));

  next();
};

module.exports = {
  nameVerification,
  emailVerification,
  passwordVerification,
};
