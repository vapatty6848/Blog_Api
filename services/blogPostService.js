const { User, BlogPost } = require('../models');

// Criar post
const createPost = async (userId, title, content) => {
  const post = await BlogPost.create({ userId, title, content });
  return post;
};

// Listar todos os post do usuário
const getAllPostsByUser = async (userId) => {
  const posts = await BlogPost.findAll({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: { userId } });
  return posts;
};

// Listar o post do usuário pelo id
const getUserPostById = async (id) => {
  const post = await BlogPost.findOne({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: { id } });
  return post;
};

// Editar o post do usuário pelo id
const updateUserPostById = async (userId, id, title, content) => {
  const post = await BlogPost.update({ title, content }, { where: { userId, id } });
  return post;
};

// Deletar o post do usuário pelo id
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
