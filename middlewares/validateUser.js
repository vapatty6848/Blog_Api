const rescue = require('express-rescue');

const { emailTypeValidation } = require('../utils/regexEmail');
const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const validateUser = rescue(async (request, response, next) => {
  const { displayName, email, password } = request.body;
  const isRegexTrue = emailTypeValidation(email);

  const { code, message } = BAD_REQUEST;

  if (displayName.lenght < 8) {
    return response.status(code).json({ message: message.invalidDisplayName });
  }

  if (!email) return response.status(code).json({ message: message.requiredEmail });

  if (!isRegexTrue) return response.status(code).json({ message: message.invalidEmail });

  if (password.lenght < 6) return response.status(code).json({ message: message.invaliPassword });

  if (!password) return response.status(code).json({ message: message.requiredPassword });

  next();
});

module.exports = { validateUser };
