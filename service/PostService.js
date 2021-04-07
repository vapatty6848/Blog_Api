const { BlogPosts, Users } = require('../models');

const createPost = async (post) => BlogPosts.create(post);

const findPosts = () => BlogPosts.findAll({ include: { model: Users, as: 'user' } });

module.exports = {
  createPost,
  findPosts,
};
