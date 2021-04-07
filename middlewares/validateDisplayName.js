const statusCode = require('../dicts/statusCodesHTTP');

function validateDisplayName(request, response, next) {
  const { displayName } = request.body;
  const minLength = 8;

  if (displayName.length < minLength) {
    next({
      code: statusCode.BAD_REQUEST,
      message: `"displayName" length must be at least ${minLength} characters long`,
    });
  }

  return next();
}

module.exports = validateDisplayName;
