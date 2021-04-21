const AppError = require('../utils/appErrors');

module.exports = (title, content) => {
  if (!title) throw new AppError('400', '"title" is required');
  if (!content) throw new AppError('400', '"content" is required');
};
