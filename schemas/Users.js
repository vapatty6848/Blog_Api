const { User } = require('../models');

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
  const result = await User.findOne({ where: { email } });

  if (result === null) return false;

  return result;
};

const validateUser = async (displayName, email, password) => {
  const isUserAlreadyregistered = await doesEmailAlreadyExists(email);

  switch (true) {
    case !isDisplayNameValid(displayName): return { message: 'displayMsg' };
    case !email || isBlank(email): return { message: 'emailRequiredMsg' };
    case !isEmailValid(email): return { message: 'emailInvalidMsg' };
    case !password || isBlank(password): return { message: 'passwordRequiredMsg' };
    case isLessThan(password, 6): return { message: 'passwordLengthMsg' };
    case isUserAlreadyregistered !== false: return { message: 'emailAlreadyExistsMsg' };

    default: return {};
  }
};

const validateLoginFields = async (email, password) => {
  const isUserAlreadyregistered = await doesEmailAlreadyExists(email);

  if (!password) return false;
  if (!isEmailValid(email) || isLessThan(password, 6) || !isUserAlreadyregistered) {
    return false;
  }

  const userPassword = isUserAlreadyregistered.dataValues.password;

  if (parseInt(password, 10) !== userPassword) return false;

  return true;
};

const validateLogin = async (email, password) => {
  const areFieldsValid = await validateLoginFields(email, password);

  switch (true) {
    case isBlank(email): return { message: 'emailEmptyMsg' };
    case !email: return { message: 'emailRequiredMsg' };
    case isBlank(password): return { message: 'passwordEmptyMsg' };
    case !password: return { message: 'passwordRequiredMsg' };
    case !areFieldsValid: return { message: 'invalidFieldsMsg' };

    default: return {};
  }
};

const validateBlogPost = (title, content) => {
  if (!title) return { status: 400, message: 'titleRequiredMsg' };
  if (!content) return { status: 400, message: 'contentRequiredMsg' };

  return {};
};

module.exports = {
  validateUser,
  validateLogin,
  validateBlogPost,
};
