const AppError = require('../../error/AppError');

const MIN_LENGTH = 1;

const validateLogin = (req, _response, next) => {
  const { email, password } = req.body;

  if (email === undefined) next(AppError('"email" is required', 400));
  if (password === undefined) next(AppError('"password" is required', 400));

  if (email.length < MIN_LENGTH) next(AppError('"email" is not allowed to be empty', 400));
  if (password.length < MIN_LENGTH) next(AppError('"password" is not allowed to be empty', 400));
  next();
};

module.exports = validateLogin;
