const createUserValidation = require('./createUserValidation');
const loginValidation = require('./loginValidation');
const authorization = require('./authorization');
const createPostValidation = require('./createPostValidation');

module.exports = {
  createUserValidation,
  loginValidation,
  authorization,
  createPostValidation,
};
