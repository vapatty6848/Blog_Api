const { BlogPosts } = require('../models');
const { User } = require('../models');

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

// Desafio 6 - Cadastrar Post
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const post = await BlogPosts.create({ title, content, userId });
  return res.status(CREATED).send({
    title: post.title,
    content: post.content,
    userId: post.userId,
  });
};

// Desafio 7 - Listar todos os posts
const getPostsAll = async (req, res) => {
  const posts = await BlogPosts.findAll({
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  return res.status(SUCCESS).json(posts);
};

// Desafio 8 - Listar post pelo id
const getPostId = async (req, res) => {
  const { id } = req.params;
  const postId = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  if (postId === null) {
    return res.status(NOT_FOUND).send({ message: 'Post não existe' });
  }
  return res.status(SUCCESS).json(postId);
};

// Desafio 9 - Atualizar post pelo id
const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const postId = await BlogPosts.update({ title, content }, id);
  console.log(postId);
  return res.status(SUCCESS).json(postId);
};

// Desafio 11 - Excluir post pelo id
const deletePost = async (req, res) => {
  const { id } = req.params;
  await BlogPosts.destroy({ where: { id } });
  return res.status(NO_CONTENT).send();
};

module.exports = {
  createPost,
  getPostsAll,
  getPostId,
  updatePost,
  deletePost,
};
