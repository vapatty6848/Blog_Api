const { BlogPosts } = require('../models');

const CREATED = 201;

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

module.exports = {
  createPost,
};
