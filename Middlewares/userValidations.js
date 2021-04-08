const { Users } = require('../models');

const validateDisplaynameEntries = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8 || typeof displayName !== 'string') {
    return next({
      status: 400,
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validateEmailEntries = (req, _res, next) => {
  const { email } = req.body;
  const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const emailRegexPass = regexEmail.test(email);

  if (!email) {
    return next({
      status: 400,
      message: '"email" is required',
    });
  }

  if (!emailRegexPass) {
    return next({
      status: 400,
      message: '"email" must be a valid email',
    });
  }

  next();
};

const validatePasswordEntries = (req, _res, next) => {
  const { password } = req.body;

  if (!password) {
    return next({
      status: 400,
      message: '"password" is required',
    });
  }

  if (password.length < 6) {
    return next({
      status: 400,
      message: '"password" length must be 6 characters long',
    });
  }

  next();
};

const newEmail = async (req, _res, next) => {
  const { email } = req.body;
  const userAlreadyExists = await Users.findOne({ where: { email } });

  if (userAlreadyExists) {
    return next({
      status: 409,
      message: 'Usuário já existe',
    });
  }
  next();
};

module.exports = {
  validateDisplaynameEntries,
  validatePasswordEntries,
  validateEmailEntries,
  newEmail,
};
