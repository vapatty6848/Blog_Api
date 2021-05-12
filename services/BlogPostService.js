const { User, BlogPost } = require('../models');

const createPost = async (userId, title, content) => {
  const post = await BlogPost.create({ userId, title, content });
  return post;
};

const getAllPostsByUser = async (userId) => {
  const posts = await BlogPost.findAll({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: { userId } });
  return posts;
};

const getUserPostById = async (id) => {
  const post = await BlogPost.findOne({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: { id } });
  return post;
};

const updateUserPostById = async (userId, id, title, content) => {
  const post = await BlogPost.update({ title, content }, { where: { userId, id } });
  return post;
};

const deleteUserPostById = async (userId, id) => {
  const post = await BlogPost.destroy({ where: { userId, id } });
  return post;
};

module.exports = {
  createPost,
  getAllPostsByUser,
  getUserPostById,
  updateUserPostById,
  deleteUserPostById,
};