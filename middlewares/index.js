const createUserValidation = require('./createUserValidation');
const loginValidation = require('./loginValidation');
const authorization = require('./authorization');
const createPostValidation = require('./createPostValidation');
const deletePostByIdValidation = require('./deletePostByIdValidation');

module.exports = {
  createUserValidation,
  loginValidation,
  authorization,
  createPostValidation,
  deletePostByIdValidation,
};
