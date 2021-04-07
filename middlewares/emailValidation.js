const { validateEmail } = require('../utils');
const statusCode = require('../dicts/statusCodesHTTP');

function emailValidation(request, response, next) {
  const { email } = request.body;
  const validation = validateEmail(email);
  if (validation.result === 'missing') {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"email" is required',
    });
  }
  if (validation.result === 'empty') {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"email" is not allowed to be empty',
    });
  }
  if (validation.result === 'invalid') {
    return next({
      code: statusCode.BAD_REQUEST,
      message: '"email" must be a valid email',
    });
  }

  return next();
}

module.exports = emailValidation;
