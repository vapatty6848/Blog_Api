const rescue = require('express-rescue');

const { emailTypeValidation } = require('../utils/regexEmail');
const { invalidName } = require('../utils/validations');

const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const { code, message } = BAD_REQUEST;

const validateEmail = rescue(async (request, response, next) => {
  const { email } = request.body;
  const isRegexTrue = emailTypeValidation(request.body.email);

  if (email === '') return response.status(code).json({ message: message.emptyEmail });

  if (!email) return response.status(code).json({ message: message.requiredEmail });

  if (!isRegexTrue) return response.status(code).json({ message: message.invalidEmail });

  next();
});

const validateName = rescue(async (request, response, next) => {
  const { displayName } = request.body;

  if (invalidName(displayName)) {
    return response.status(code).json({ message: message.invalidDisplayName });
  }

  next();
});

const validatePassword = rescue(async (request, response, next) => {
  const { password } = request.body;

  if (password === '') {
    return response
      .status(BAD_REQUEST.code)
      .json({ message: BAD_REQUEST.message.emptyPassword });
  }

  if (!password) {
    return response.status(code).json({ message: message.requiredPassword });
  }

  next();
});

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
};
