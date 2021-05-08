const Yup = require('yup');
const AppError = require('../utils/AppError');

const SESSION_SCHEMA = Yup.object().shape({
  email: Yup.string().test('email-not-empty', '"email" is not allowed to be empty',
    (value) => value !== '').required('"email" is required'),
  password: Yup.string().test('password-not-empty', '"password" is not allowed to be empty',
    (value) => value !== '').required('"password" is required'),
});

async function validateSessionObj(req, _res, next) {
  try {
    await SESSION_SCHEMA.validate(req.body, {
      abortEarly: true,
    });
    return next();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const validationError = error.errors[0];
      throw new AppError(validationError);
    }
    return next(error);
  }
}

module.exports = validateSessionObj;
