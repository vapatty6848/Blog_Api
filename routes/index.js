const users = require('./users.routes');
const posts = require('./posts.routes');
const notFound = require('./notFound');

module.exports = {
  users,
  posts,
  notFound,
};
