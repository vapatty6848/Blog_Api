const { Op } = require('sequelize');
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

const updatePost = async (title, content, userId, id) => {
  const userIdFromDb = await BlogPosts.findOne({ where: { id } });

  if (userIdFromDb.userId !== userId) return null;

  await BlogPosts.update({ title, content }, { where: { id } });

  return { title, content, userId };
};

const searchPostsByQuery = async (query) => {
  const posts = await BlogPosts.findAll({
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
    where: {
      [Op.or]: {
        title: { [Op.substring]: query },
        content: { [Op.substring]: query },
      },
    },
  });

  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  searchPostsByQuery,
};
