const { BlogPosts } = require('../models');
const { User } = require('../models');

const SUCCESS = 200;
const CREATED = 201;
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

module.exports = {
  createPost,
  getPostsAll,
  getPostId,
};
