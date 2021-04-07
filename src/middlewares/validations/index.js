const validateUserCreation = require('./validateUserCreation');
const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validatePostContent = require('./validatePostContent');
const validatePostOwnership = require('./validatePostOwnership');

module.exports = {
  validateUserCreation,
  validateLogin,
  validateToken,
  validatePostContent,
  validatePostOwnership,
};
