const validateDisplayName = require('./validateDisplayName');
const emailValidation = require('./emailValidation');
const passwordValidation = require('./passwordValidation');
const validateUniqueEmail = require('./validateUniqueEmail');
const tokenValidation = require('./tokenValidation');
const blogpostValidation = require('./blogpostValidation');
const userAuthorization = require('./userAuthorization');

module.exports = {
  validateDisplayName,
  emailValidation,
  passwordValidation,
  validateUniqueEmail,
  tokenValidation,
  blogpostValidation,
  userAuthorization,
};
