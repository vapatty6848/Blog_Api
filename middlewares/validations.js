const { validateUser, validateLogin, validateBlogPost } = require('../schemas/Users');
const { SUCESS, BAD_REQUEST, CONFLICT, UNAUTHORIZED, NOT_FOUND } = require('./httpStatus');
const BlogPostsServices = require('../services/BlogPostsServices');

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

const checkPostCreator = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPostsServices.getPostById(id);

  if (post.length === 0) {
    return next({
      statusCode: NOT_FOUND,
      customMessage: 'postNotFound',
    });
  }

  const creatorId = post[0].dataValues.user.dataValues.id;

  if (creatorId !== req.userId) {
    return next({
      statusCode: UNAUTHORIZED,
      customMessage: 'userNotAuthorized',
    });
  }

  next();
};

module.exports = {
  userValidation,
  LoginValidation,
  BlogPostValidation,
  checkPostCreator,
};
