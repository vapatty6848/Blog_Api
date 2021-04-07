const { User } = require('../models');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const err = {
  status: 0,
  messageObject: {
    message: '',
  },
};

const validateDisplayName = (req, _res, next) => {
  const minCharacter = 8;
  const { displayName } = req.body;
  if (displayName.length < minCharacter) {
    err.status = BAD_REQUEST;
    err.messageObject.message = '"displayName" length must be at least 8 characters long';
    return next(err);
  }
  return next();
};

const validateEmail = (req, _res, next) => {
  const { email } = req.body;
  if (!email) {
    err.status = BAD_REQUEST;
    err.messageObject.message = '"email" is required';
    return next(err);
  }
  const expectedFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  const formatIsRigth = expectedFormat.test(email);
  if (!formatIsRigth) {
    err.status = BAD_REQUEST;
    err.messageObject.message = '"email" must be a valid email';
    return next(err);
  }
  return next();
};

const validatePassword = (req, _res, next) => {
  const { password } = req.body;
  const minCharacter = 6;
  if (!password) {
    err.status = BAD_REQUEST;
    err.messageObject.message = '"password" is required';
    return next(err);
  }
  if (password.length < minCharacter) {
    err.status = BAD_REQUEST;
    err.messageObject.message = '"password" length must be 6 characters long';
    return next(err);
  }
  return next();
};

const verifyExistUser = async (req, res, next) => {
  const { email } = req.body;
  const searchEmail = await User.findOne({ where: { email } });
  if (searchEmail) {
    err.status = CONFLICT;
    err.messageObject.message = 'Usuário já existe';
    return next(err);
  }
  return next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  verifyExistUser,
};
