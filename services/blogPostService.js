const { BlogPosts } = require('../models');

const NOT_FOUND = 404;
const UNAUTHORIZED = 401; 

const findAllPosts = async () => {
  const foundPosts = await BlogPosts.findAll({
    include: { association: 'user', attributes: { exclude: ['password'] } },
  });
  return foundPosts;
};

const findPostsById = async (id) => {
  const foundPosts = await BlogPosts.findOne({
    where: { id },
    include: { association: 'user', attributes: { exclude: ['password'] } } });

  if (!foundPosts) {
    return { status: NOT_FOUND, message: 'Post não existe', isError: true };
  }
  return foundPosts;
};

const createPost = async ({ title, content, userId }) => {
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

const updatePost = async (id, title, content, userId) => {
  const findPost = await BlogPosts.findOne({ where: { id } });
  if (findPost.userId !== userId) {
    return { status: UNAUTHORIZED, message: 'Usuário não autorizado', isError: true };
  }

  await BlogPosts.update({ title, content }, { where: { id } });
  return { title, content, userId };
};

const deletePost = async (email) => {
  const postDeleted = await BlogPosts.destroy({ where: { email } });

  return postDeleted;
};

module.exports = {
  findAllPosts,
  findPostsById,
  createPost,
  updatePost,
  deletePost,
};
