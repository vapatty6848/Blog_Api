const validateUser = require('./validateUser');
const validateToken = require('./validateToken');
const validateSession = require('./validateSession');
const { validatePost, validateUserPost } = require('./validatePost');

module.exports = {
  validateUser,
  validateToken,
  validateSession,
  validatePost,
  validateUserPost,
};
