const { userSchema, loginSchema } = require('../schemas/UserSchema');
const validateRegister = require('./validateRegister');
const validateLogin = require('./validateLogin');

const validateUserRegister = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    await userSchema.validate({ displayName, email, password });
    await validateRegister(req, res, next);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
  next();
};

const validateUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await loginSchema.validate({ email, password });
    await validateLogin(req, res, next);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
  next();
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};
