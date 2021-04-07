const { BlogPosts } = require('../models');

const createPost = async (post) => BlogPosts.create(post);

const findPosts = () => BlogPosts.findAll();

module.exports = {
  createPost,
  findPosts,
};
