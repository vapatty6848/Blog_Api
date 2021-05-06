const { BlogPosts } = require('../models');

const findAllPosts = async () => {
  const foundPosts = await BlogPosts.findAll();

  return foundPosts;
};

const createPost = async (title, content, userId) => {
  const post = await BlogPosts.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });

  const newPost = {
    title: post.title,
    content: post.content,
    userId: post.userId,
  };

  return newPost;
};

const deletePost = async (email) => {
  const postDeleted = await BlogPosts.destroy({ where: { email } });

  return postDeleted;
};

module.exports = {
  findAllPosts,
  createPost,
  deletePost,
};
