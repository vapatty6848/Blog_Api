const { User } = require('../models');
const messages = require('../util/returnedMessages');
const comebackResponse = require('../util/comebackResponse');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) return comebackResponse(res, 400, messages.requiredEmail);
  if (email.length === 0) return comebackResponse(res, 400, messages.emptyEmail);
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) return comebackResponse(res, 400, messages.requiredPassword);
  if (password.length === 0) return comebackResponse(res, 400, messages.emptyPassword);
  next();
}

module.exports = {
  validateEmail,
  validatePassword,
};
