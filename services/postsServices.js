const { BlogPosts, User } = require('../models');
const postValidation = require('../validation/postValidation');
const AppError = require('../utils/appErrors');
const userService = require('./usersServices');

const createPosts = async (title, content, userId) => {
  postValidation(title, content);

  return BlogPosts.create({ title, content, userId });
};

const findAllPosts = async () => BlogPosts.findAll();

const findById = async (id) => {
  const postById = await BlogPosts.findOne({ where: { id } });
  if (!postById) throw new AppError('404', 'Post não existe');

  const { dataValues: post } = postById;
  const { dataValues: user } = await userService.findById(postById.userId);

  delete post.userId;
  delete user.password;
  return { ...post, user };
};

const deletePost = async (id, email) => {
  const userById = await User.findOne({ where: { email } });
  const postById = await BlogPosts.findOne({ where: { id } });

  if (!postById) throw new AppError('404', 'Post não existe');

  const { dataValues: user } = userById;
  const { dataValues: post } = postById;

  if (user.id !== post.userId) throw new AppError(401, 'Usuário não autorizado');

  await BlogPosts.destroy({ where: { id } });
};

module.exports = {
  createPosts,
  findAllPosts,
  findById,
  deletePost,
};
