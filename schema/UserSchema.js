const userService = require('../services/UserService');

const isBlank = (field) => field === '';
const isString = (name) => typeof (name) === 'string';
const isLessThan = (name, size) => name.toString().length < size;

const isEmailValid = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(email);
};

const isDisplayNameValid = (displayName) => {
  if (isString(displayName) && !isLessThan(displayName, 8)) return true;
  return false;
};

const emailAlreadyExists = async (email) => {
  if (!email) return false;

  const result = await userService.getByEmail(email);
  if (!result) return false;

  return result;
};

const validateUser = async (displayName, email, password) => {
  const isUserAlreadyregistered = await emailAlreadyExists(email);

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

const checkLoginFields = async (email, password) => {
  const user = await emailAlreadyExists(email);
  if (!password || !isEmailValid(email) || isLessThan(password, 6) || !user) {
    return false;
  }

  const userPassword = user.dataValues.password;
  // if (parseInt(password, 10) !== userPassword) return false;
  if (password.toString() !== userPassword.toString()) return false;

  return user.dataValues;
};

const validateLogin = async (email, password) => {
  const user = await checkLoginFields(email, password);

  switch (true) {
    case isBlank(email): return { status: 400, message: '"email" is not allowed to be empty' };
    case !email: return { status: 400, message: '"email" is required' };
    case isBlank(password): return { status: 400, message: '"password" is not allowed to be empty' };
    case !password: return { status: 400, message: '"password" is required' };
    case !user: return { status: 400, message: 'Campos inválidos' };

    default: return user;
  }
};

module.exports = {
  validateUser,
  validateLogin,
};
