const AppError = require('../errors/AppError');

const passwordError = '"password" is not allowed to be empty';
const emailError = '"email" is not allowed to be empty';
const requiredPassword = '"password" is required';
const requiredEmail = '"email" is required';

const MIN_LENGTH = 1;

function validateUserData(request, _response, next) {
  const { email, password } = request.body;

  if (email === undefined) throw new AppError(requiredEmail);
  if (password === undefined) throw new AppError(requiredPassword);

  if (email.length < MIN_LENGTH) throw new AppError(emailError);
  if (password.length < MIN_LENGTH) throw new AppError(passwordError);

  next();
}

module.exports = validateUserData;
