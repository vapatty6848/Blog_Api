const statusCode = require('../dicts/statusCodesHTTP');

function validateEmail(request, response, next) {
  const { email } = request.body;
  const regexPattern = /\S+@\S+/;
  const isEmailValid = regexPattern.test(email);

  if (!email) {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"email" is required',
    });
  }

  if (!isEmailValid) {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"email" must be a valid email',
    });
  }

  return next();
}

module.exports = validateEmail;
