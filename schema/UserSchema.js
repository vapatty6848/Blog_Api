const userService = require('../services/UserService');

const isString = (name) => typeof (name) === 'string';
const isLessThan = (name, number) => name.toString().length < number;
const isBlank = (field) => field === '';

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
  const result = await userService.getByEmail(email);

  if (result.length === 0) return false;

  return result;
};

const validateUser = async (displayName, email, password) => {
  const isUserAlreadyregistered = await doesEmailAlreadyExists(email);

  switch (true) {
    case !isDisplayNameValid(displayName):
      return { status: 400, message: '"displayName" length must be at least 8 characters long' };
    case !email || isBlank(email):
      return { status: 400, message: '"email" is required' };
    case !isEmailValid(email):
      return { status: 400, message: '"email" must be a valid email' };
    case !password || isBlank(password):
      return { status: 400, message: '"password" is required' };
    case isLessThan(password, 6):
      return { status: 400, message: '"password" length must be 6 characters long' };
    case isUserAlreadyregistered !== false:
      return { status: 409, message: 'Usuário já existe' };

    default: return {};
  }
};

const validateLoginFields = async (email, password) => {
  const isUserAlreadyregistered = await doesEmailAlreadyExists(email);

  if (!password) return false;
  if (!isEmailValid(email) || isLessThan(password, 6) || !isUserAlreadyregistered) {
    return false;
  }

  const userPassword = isUserAlreadyregistered[0].dataValues.password;

  if (parseInt(password, 10) !== userPassword) return false;

  return true;
};

const validateLogin = async (email, password) => {
  const areFieldsValid = await validateLoginFields(email, password);

  switch (true) {
    case isBlank(email): return { status: 400, message: 'emailEmptyMsg' };
    case !email: return { status: 400, message: 'emailRequiredMsg' };
    case isBlank(password): return { status: 400, message: 'passwordEmptyMsg' };
    case !password: return { status: 400, message: 'passwordRequiredMsg' };
    case !areFieldsValid: return { status: 400, message: 'invalidFieldsMsg' };

    default: return {};
  }
};

module.exports = {
  validateUser,
  validateLogin,
};
