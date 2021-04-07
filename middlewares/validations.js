const { User } = require('../models');
const messages = require('../util/returnedMessages');

const comebackResponse = (res, status, messageLine) => res.status(status)
  .json({ message: messageLine });

const validEmailRegex = (email) => /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  .test(email);

const validateName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) return comebackResponse(res, 400, messages.nameTooShort);
  return next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return comebackResponse(res, 400, messages.requiredEmail);
  if (!validEmailRegex(email)) return comebackResponse(res, 400, messages.invalidEmail);

  const foundUser = await User.findAll({ where: { email } });
  if (foundUser.length !== 0) return comebackResponse(res, 409, messages.userAlreadExists);
  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return comebackResponse(res, 400, messages.requiredPassword);
  if (password.length < 6) return comebackResponse(res, 400, messages.passwordTooShort);
  return next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
