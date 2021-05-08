const Yup = require('yup');
const AppError = require('../utils/AppError');

const BLOGPOST_SCHEMA = Yup.object().shape({
  title: Yup.string().required('"title" is required'),
  content: Yup.string().required('"content" is required'),
});

async function validateBlogPostObj(req, _res, next) {
  try {
    await BLOGPOST_SCHEMA.validate(req.body, {
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

module.exports = validateBlogPostObj;
