const validateEmail = require('./validateEmail');
const validateName = require('./validateName');
const validatePassword = require('./validatePassword');
const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validateUser = require('./validateUser');
const validateTitle = require('./validateTitle');
const validateContent = require('./validateContent');
const validatePost = require('./validatePost');
const validatePostAuthor = require('./validatePostAuthor');

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
  validateLogin,
  validateToken,
  validateUser,
  validateContent,
  validateTitle,
  validatePost,
  validatePostAuthor,
};
