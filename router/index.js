const user = require('./userRoute');
const session = require('./sessionRouter');
const posts = require('./postRouter');

module.exports = {
  user,
  session,
  posts,
};
