const AppError = require('../utils/appErrors');

module.exports = (email, password) => {
  if (email === '') throw new AppError('400', '"email" is not allowed to be empty');
  if (password === '') throw new AppError('400', '"password" is not allowed to be empty');

  if (!email) throw new AppError('400', '"email" is required');
  if (!password) throw new AppError('400', '"password" is required');
};
