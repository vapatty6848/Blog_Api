const AppError = require('../utils/appErrors');
const emailRegexCheck = require('../utils/emailRegexCheck');

module.exports = (displayName, email, password) => {
  if (!displayName) throw new AppError('400', '"displayName" is required');
  if (!email) throw new AppError('400', '"email" is required');
  if (!password) throw new AppError('400', '"password" is required');

  if (displayName.length < 8) throw new AppError('400', '"displayName" length must be at least 8 characters long');
  if (password.length < 6) throw new AppError('400', '"password" length must be 6 characters long');

  if (!emailRegexCheck(email)) throw new AppError('400', '"email" must be a valid email');
};
