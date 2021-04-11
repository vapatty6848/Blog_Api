const { BlogPosts, Users } = require('../models');

const createPost = async (title, content, userId) => {
  console.log('CREATE POST SERVICE');

  await BlogPosts.create({ title, content, userId });

  return { title, content, userId };
};

const getAllPosts = async () => {
  console.log('GET ALL POSTS SERVICE');

  const posts = await BlogPosts.findAll({ include: { model: Users, as: 'user' } });

  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
};
