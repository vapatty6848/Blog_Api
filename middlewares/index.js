const validateDisplayName = require('./validateDisplayName');
const emailValidation = require('./emailValidation');
const passwordValidation = require('./passwordValidation');
const validateUniqueEmail = require('./validateUniqueEmail');

module.exports = {
  validateDisplayName,
  emailValidation,
  passwordValidation,
  validateUniqueEmail,
};
