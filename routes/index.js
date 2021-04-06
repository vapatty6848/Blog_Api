const users = require('./users.routes');
const posts = require('./posts.routes');
const session = require('./session.routes');
const notFound = require('./notFound');

module.exports = {
  users,
  posts,
  session,
  notFound,
};
