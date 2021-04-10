const createUser = require('./createUser');
const getAllUsers = require('./getAllUsers');
const getUserById = require('./getUserById');
const deleteLoggedUser = require('./deleteLoggedUser');
const createPost = require('./createPost');
const getAllPosts = require('./getAllPosts');
const getPostById = require('./getPostById');
const deletePostById = require('./deletePostById');

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteLoggedUser,
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
};
