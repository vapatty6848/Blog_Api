const { validateUser, validateLogin, validateBlogPost } = require('../schemas/Users');
const { SUCESS, BAD_REQUEST, CONFLICT } = require('./httpStatus');

const userValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const validations = await validateUser(displayName, email, password);

  if (validations.message) {
    return next({
      statusCode: validations.message === 'emailAlreadyExistsMsg' ? CONFLICT : BAD_REQUEST,
      customMessage: validations.message,
    });
  }

  next();
};

const LoginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  const validations = await validateLogin(email, password);

  if (validations.message) {
    return next({
      statusCode: BAD_REQUEST,
      customMessage: validations.message,
    });
  }

  req.status = SUCESS;

  next();
};

const BlogPostValidation = (req, res, next) => {
  const { title, content } = req.body;

  const validations = validateBlogPost(title, content);

  if (validations.message) {
    return next({
      statusCode: BAD_REQUEST,
      customMessage: validations.message,
    });
  }

  next();
};

module.exports = {
  userValidation,
  LoginValidation,
  BlogPostValidation,
};
