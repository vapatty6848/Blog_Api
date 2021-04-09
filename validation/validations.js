const {
  DISPLAY_NAME_TOO_SHORT,
  EMAIL_IS_INVALID,
  EMAIL_IS_REQUIRED,
  EMAIL_IS_NOT_EMPTY,
  PASSWORD_IS_REQUIRED,
  PASSWORD_IS_NOT_EMPTY,
  PASSWORD_NAME_TOO_SHORT,
  USER_ALREADY_REGISTERED,
  USER_NOT_FOUND,
} = require('../dictionary/errorMessages');
const {
  BAD_REQUEST,
  CONFLICT,
} = require('../dictionary/statusCodes');
const { User } = require('../models');

const validateEmailForm = async (request, response, next) => {
  const { email } = request.body;
  const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailFormatIsIncorrect = !emailValidator.test(String(email).toLowerCase());

  if (emailFormatIsIncorrect) {
    return response
      .status(BAD_REQUEST)
      .send({ message: EMAIL_IS_INVALID });
  }

  next();
};

const validateEmailIsRequired = async (request, response, next) => {
  const user = request.body;
  const emailIsMissing = !user.email;
  const emailIsNotEmpty = user.email === '';

  if (emailIsNotEmpty) {
    return response
      .status(BAD_REQUEST)
      .json({ message: EMAIL_IS_NOT_EMPTY });
  }

  if (emailIsMissing) {
    return response
      .status(BAD_REQUEST)
      .json({ message: EMAIL_IS_REQUIRED });
  }

  next();
};

const validateEmailUniqueness = async (request, response, next) => {
  const { email } = request.body;
  const emailIsNotUnique = await User.findOne({ where: { email } });

  if (emailIsNotUnique) {
    return response.status(CONFLICT).send({
      message: USER_ALREADY_REGISTERED,
    });
  }

  next();
};

const validateNameLength = async (request, response, next) => {
  const { displayName } = request.body;
  const isDisplayNameOfIncorrectLength = displayName.length < 8;

  if (isDisplayNameOfIncorrectLength) {
    return response
      .status(BAD_REQUEST)
      .send({ message: DISPLAY_NAME_TOO_SHORT });
  }

  next();
};

const validatePassordIsRequired = async (request, response, next) => {
  const user = request.body;
  const passwordIsMissing = !user.password;
  const passwordIsNotEmpty = user.password === '';

  if (passwordIsNotEmpty) {
    return response
      .status(BAD_REQUEST)
      .json({ message: PASSWORD_IS_NOT_EMPTY });
  }

  if (passwordIsMissing) {
    return response
      .status(BAD_REQUEST)
      .json({ message: PASSWORD_IS_REQUIRED });
  }

  next();
};

const validatePasswordLength = async (request, response, next) => {
  const { password } = request.body;
  const isPasswordOfIncorrectLength = password.length < 6;

  if (isPasswordOfIncorrectLength) {
    return response
      .status(BAD_REQUEST)
      .send({ message: PASSWORD_NAME_TOO_SHORT });
  }

  next();
};

const validateUserExistence = async (request, response, next) => {
  const { email } = request.body;
  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) {
    return response
      .status(BAD_REQUEST)
      .send({ message: USER_NOT_FOUND });
  }

  next();
};

module.exports = {
  validateEmailForm,
  validateEmailIsRequired,
  validateEmailUniqueness,
  validateNameLength,
  validatePassordIsRequired,
  validatePasswordLength,
  validateUserExistence,
};
