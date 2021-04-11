const Validations = require('./validations');
const JWT = require('./utils');

const userLogin = async ({ email, password }) => {
  const action = 'LOGIN';
  const passwordValidation = Validations.validatePassword(password, action);
  const emailValidation = await Validations.validateEmail(email, action);

  if (passwordValidation.payload) return passwordValidation;
  if (emailValidation.payload) return emailValidation;

  const loginValidation = Validations.validateLogin(emailValidation, password);

  if (loginValidation.payload) return loginValidation;
  const { id, displayName } = loginValidation;

  const result = JWT.generateToken({ id, displayName });
  return result;
};

module.exports = {
  userLogin,
};
