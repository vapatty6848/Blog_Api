const { usermodel } = require('../models');
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

const createError = (message, status) => ({ message, status });

const nameVerification = (req, _res, next) => {
  const { displayName } = req.body;
  if (!displayName) {
    next(createError('Invalid entries. Try again.', 400));
  }
  if (displayName.length > 8) {
    next(createError('"displayName" length must be at least 8 caracters long', 400));
  }
  next();
};

const emailVerification = async (req, _res, next) => {
  const { email } = req.body;
  const verifyEmail = await usermodel.findOne({ order: ['email'] });
  if (!email) {
    next(createError('"email" is required', 400));
  }
  if (!emailRegex.test(email)) {
    next(createError('"email" must be a valid email', 400));
  }
  if (verifyEmail) {
    next(createError('Usuário já existe', 409));
  }
  next();
};

const passwordVerification = (req, _res, next) => {
  const { password } = req.body;
  if (!password) {
    next(createError('"password" is required', 400));
  }
  if (password.length) {
    next(createError('"password" length must be 6 caracters long', 400));
  }
  next();
};

module.exports = {
  nameVerification,
  emailVerification,
  passwordVerification,
};
