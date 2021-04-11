const validateLogin = require('./validateLogin');
const validatePost = require('./validatePost');
const validateToken = require('./validateToken');
const validateUser = require('./validateUser');
const validatePostOwner = require('./validatePostOwner');
const postExistence = require('./postExistence');

module.exports = {
  validateLogin,
  validatePost,
  validateToken,
  validateUser,
  validatePostOwner,
  postExistence,
};
