const { status, messages } = require('../../libs/dicts');
const { ThrowError } = require('../errorHandler/utils');
const { isEmailValid, isNameValid, isPasswordValid } = require('./utils');
const { Users } = require('../../../models');

const validateUserCreation = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ThrowError(status.badRequest, messages.invalidBody);
    }
    if (!email) throw new ThrowError(status.badRequest, messages.missingEmail);
    if (!password) throw new ThrowError(status.badRequest, messages.missingPassword);
    if (!isNameValid(displayName)) throw new ThrowError(status.badRequest, messages.invalidName);
    if (!isEmailValid(email)) throw new ThrowError(status.badRequest, messages.invalidEmail);
    if (!isPasswordValid(password)) {
      throw new ThrowError(status.badRequest, messages.invalidPassword);
    }
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) throw new ThrowError(status.conflict, messages.duplicatedEmail);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateUserCreation;
