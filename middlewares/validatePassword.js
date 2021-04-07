const statusCode = require('../dicts/statusCodesHTTP');

function validatePassword(request, response, next) {
  const { password } = request.body;
  const minLength = 6;

  if (!password) {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"password" is required',
    });
  }

  if (password.length < minLength) {
    return next({
      code: statusCode.BAD_REQUEST,
      message: `"password" length must be ${minLength} characters long`,
    });
  }

  return next();
}

module.exports = validatePassword;
