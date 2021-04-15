const AppError = require('../../error/AppError');

const validateBlogs = (request, res, next) => {
  const { title, content } = request.body;
  if (!title) next(AppError('"title" is required'));
  if (!content) next(AppError('"content" is required'));
  next();
};

module.exports = validateBlogs;
