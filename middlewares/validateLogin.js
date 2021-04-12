const { validateEmailLogin, validatePasswordLogin } = require('./validations');

const validateLogin = async (req, res, next) => {
  await validateEmailLogin(req, res, next);
  await validatePasswordLogin(req, res, next);
};

module.exports = validateLogin;
