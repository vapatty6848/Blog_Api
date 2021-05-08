const { BlogPosts, User } = require('../models');

const createPost = async (title, content, userId) => {
  const createdPost = await BlogPosts.create({ title, content, userId });

  return createdPost;
};

const getAllPosts = async () => {
  const getPosts = await BlogPosts.findAll({
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  return getPosts;
};

const getPostById = async (id) => {
  const post = await BlogPosts.findAll({
    where: { id },
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (post.length === 0) return null;

  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
