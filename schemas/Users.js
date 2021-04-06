const { User } = require('../models');

const isString = (name) => typeof (name) === 'string';
const isLessThan = (name, number) => name.toString().length < number;
const isBlank = (field) => !field || field === '';

const isEmailValid = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return regex.test(email);
};

const isDisplayNameValid = (displayName) => {
  if (isString(displayName) && !isLessThan(displayName, 8)) return true;

  return false;
};

const doesEmailAlreadyExists = async (email) => {
  if (!email) return false;
  const result = await User.findAll({ where: { email } });

  if (result.length === 0) return false;

  return true;
};

const validateUser = async (displayName, email, password) => {
  const isUserAlreadyregistered = await doesEmailAlreadyExists(email);

  switch (true) {
    case !isDisplayNameValid(displayName): return { status: 400, message: 'displayMsg' };
    case isBlank(email): return { status: 400, message: 'emailRequiredMsg' };
    case !isEmailValid(email): return { status: 400, message: 'emailInvalidMsg' };
    case isBlank(password): return { status: 400, message: 'passwordRequiredMsg' };
    case isLessThan(password, 6): return { status: 400, message: 'passwordLengthMsg' };
    case isUserAlreadyregistered: return { status: 409, message: 'emailAlreadyExistsMsg' };

    default: return {};
  }
};

module.exports = validateUser;
