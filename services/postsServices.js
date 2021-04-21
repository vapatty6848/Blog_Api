const { BlogPosts } = require('../models');
const postValidation = require('../validation/postValidation');
const AppError = require('../utils/appErrors');

const createPosts = async (title, content, userId) => {
  postValidation(title, content);

  return BlogPosts.create({ title, content, userId });
};

const findAllPosts = async () => BlogPosts.findAll();

const findById = async (id) => {
  const postById = await BlogPosts.findOne({ where: { user: { id } } });
  if (!postById) throw new AppError('404', 'Post não existe');

  return postById;
};

module.exports = {
  createPosts,
  findAllPosts,
  findById,
};
