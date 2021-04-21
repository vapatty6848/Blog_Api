const { BlogPosts, User } = require('../models');
const postValidation = require('../validation/postValidation');
const AppError = require('../utils/appErrors');
const userService = require('./usersServices');

const createPosts = async (title, content, userId) => {
  postValidation(title, content);

  return BlogPosts.create({ title, content, userId });
};

const findAllPosts = async () => BlogPosts.findAll({
  attributes: { exclude: 'userId' },
  include: { model: User, as: 'user' },
});

const findById = async (id) => {
  const postById = await BlogPosts.findOne(
    { raw: true, where: { id } },
  );
  if (!postById) throw new AppError('404', 'Post não existe');

  const user = await userService.findById(postById.userId);

  delete postById.userId;
  delete user.password;
  return { ...postById, user };
};

const deletePost = async (id, userById) => {
  const postById = await BlogPosts.findOne(
    { raw: true, where: { id } },
  );
  if (!postById) throw new AppError('404', 'Post não existe');

  if (userById !== postById.userId) throw new AppError(401, 'Usuário não autorizado');

  await BlogPosts.destroy({ where: { id } });
};

const editPost = async (title, content, id, userId) => {
  const postById = await BlogPosts.findOne({ where: { id } });

  postValidation(title, content);
  if (userId !== postById.userId) throw new AppError(401, 'Usuário não autorizado');

  postById.title = title;
  postById.content = content;

  await postById.save();

  return postById;
};

module.exports = {
  createPosts,
  findAllPosts,
  findById,
  deletePost,
  editPost,
};
