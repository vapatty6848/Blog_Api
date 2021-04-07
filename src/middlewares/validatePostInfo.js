const AppError = require('../errors/AppError');

const titleError = '"title" is required';
const contentError = '"content" is required';

function validatePostData(request, _response, next) {
  const { title, content } = request.body;

  if (!title) throw new AppError(titleError);
  if (!content) throw new AppError(contentError);

  next();
}

module.exports = validatePostData;
