const { validateEmailLogin, validatePasswordLogin } = require('./validations');

const validateLogin = async (req, res, next) => {
  try {
    await validateEmailLogin(req, res);
    await validatePasswordLogin(req, res);
  } catch (err) {
    next(err);
  }
  next();
};

module.exports = validateLogin;
