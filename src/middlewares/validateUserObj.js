const Yup = require('yup');
const AppError = require('../utils/AppError');

const MIN_NAME_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;

const USER_SCHEMA = Yup.object().shape({
  displayName: Yup.string().min(MIN_NAME_LENGTH,
    `"displayName" length must be at least ${MIN_NAME_LENGTH} characters long`).required(),
  email: Yup.string().email('"email" must be a valid email').required('"email" is required'),
  password: Yup.string().min(MIN_PASSWORD_LENGTH,
    `"password" length must be ${MIN_PASSWORD_LENGTH} characters long`).required('"password" is required'),
  image: Yup.string(),
});

async function validateUserObj(req, _res, next) {
  try {
    await USER_SCHEMA.validate(req.body, {
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

module.exports = validateUserObj;
