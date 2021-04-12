const { userSchema, loginSchema } = require('../schemas/UserSchema');
const validateRegister = require('./validateRegister');
const validateLogin = require('./validateLogin');

const validateUserRegister = async (req, res, next) => {
  try {
    await validateRegister(req, res, next);
    const { displayName, email, password } = req.body;
    await userSchema.validate({ displayName, email, password });
  } catch (err) {
    return next(err);
  }
  next();
};

const validateUserLogin = async (req, res, next) => {
  try {
    await validateLogin(req, res, next);
    const { email, password } = req.body;
    await loginSchema.validate({ email, password });
  } catch (err) {
    // return res.status(400).send({ message: err.message });
    return next(err);
  }
  next();
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};
