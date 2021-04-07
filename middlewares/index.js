const validateDisplayName = require('./validateDisplayName');
const emailValidation = require('./emailValidation');
const validatePassword = require('./validatePassword');
const validateUniqueEmail = require('./validateUniqueEmail');

module.exports = {
  validateDisplayName,
  emailValidation,
  validatePassword,
  validateUniqueEmail,
};
