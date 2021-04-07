const AppError = require('../errors/AppError');

const displayNameError = '"displayName" must be at least 8 characters long';
const passwordError = '"password" must be at least 6 characters long';
const emailError = '"email" must be a valid email';
const requiredPassword = '"password" is required';
const requiredEmail = '"email" is required';

const MIN_NAME_LENGTH = 8;
const MIN_PW_LENGTH = 6;

function validateUserData(request, _response, next) {
  const { displayName, email, password } = request.body;

  if (!email) throw new AppError(requiredEmail);
  if (!password) throw new AppError(requiredPassword);

  if (displayName.length < MIN_NAME_LENGTH) throw new AppError(displayNameError);
  if (password.length < MIN_PW_LENGTH) throw new AppError(passwordError);

  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) throw new AppError(emailError);

  next();
}

module.exports = validateUserData;
