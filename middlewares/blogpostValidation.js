const statusCode = require('../dicts/statusCodesHTTP');

function blogpostValidation(request, response, next) {
  const { title, content } = request.body;
  if (!title) {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"title" is required',
    });
  }

  if (!content) {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"content" is required',
    });
  }

  return next();
}

module.exports = blogpostValidation;
