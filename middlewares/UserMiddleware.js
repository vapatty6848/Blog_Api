const { userSchema } = require('../schemas/UserSchema');
const validateRegister = require('./validateRegister');
const validateLogin = require('./validateLogin');

const validateUserRegister = async (req, res, next) => {
  try {
    await validateRegister(req, res, next);
    const { displayName, email, password } = req.body;
    await userSchema.validate({ displayName, email, password });
  } catch (err) {
    next(err);
  }
  next();
};

const validateUserLogin = async (req, res, next) => {
  try {
    await validateLogin(req, res, next);
    const { email, password } = req.body;
    await userSchema.validate({ email, password });
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};
