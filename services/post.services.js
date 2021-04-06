const { BlogPosts, Users } = require('../models');
const { authNewPost } = require('../schemas');

const create = async (body, userId) => {
  const { title, content } = body;
  authNewPost(title, content);
  await BlogPosts.create({
    user_id: userId,
    title,
    content,
  });
  const newPost = { userId, title, content };
  return newPost;
};

const getAll = async () => {
  const getPosts = await BlogPosts.findAll({ include: { model: Users, as: 'user' } });
  return getPosts;
};

module.exports = {
  create,
  getAll,
};
