const { BlogPosts } = require('../models');
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

module.exports = {
  create,
};
