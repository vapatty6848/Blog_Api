const validateUser = require('./validateUser');
const validateSession = require('./validateSession');
const validateToken = require('./validateToken');
const { validatePost, validateUserPost } = require('./validatePost');

module.exports = {
  validateUser,
  validateSession,
  validateToken,
  validatePost,
  validateUserPost,
};
