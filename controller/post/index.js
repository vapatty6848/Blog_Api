const CreatePostController = require('./CreatePostsController');
const getPosts = require('./GetPostsController');
const getPostById = require('./GetPostByIdController');
const editPostController = require('./EditPostController');
const deletePostController = require('./DeletePostController');
const getByTextController = require('./getByTextController');

module.exports = {
  CreatePostController,
  getPosts,
  getPostById,
  editPostController,
  deletePostController,
  getByTextController,
};
