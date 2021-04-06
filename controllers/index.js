const posts = require('./posts.controllers');
const users = require('./users.controllers');
const session = require('./session.controllers');

module.exports = {
  users,
  posts,
  session,
};
