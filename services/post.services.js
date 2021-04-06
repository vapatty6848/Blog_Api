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

const getOne = async (id) => {
  const getPost = await BlogPosts.findOne({
    where: { user_id: id },
    include: { model: Users, as: 'user' },
  });
  if (!getPost) throw new Error('C_ERR_POST_NOT_FOUND');
  return getPost;
};

module.exports = {
  create,
  getAll,
  getOne,
};
