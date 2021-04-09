const { Router } = require('express');
const { Users, BlogPosts } = require('../models');
const { validateToken } = require('../auth');
const validatePost = require('../middlewares/validatePost');
// const findByEmail = require('../utils/findByEmail');

const routerPost = Router();

routerPost.get('/', async (_req, res) => {
  BlogPosts.findAll({ include: { model: Users, as: 'user' } })
    .then((posts) => {
      res.status(200).json(posts);
    });
});

routerPost.get('/:id', validateToken, async (req, res) => {
  const user = await BlogPosts.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  res.status(200).json(user);
});

routerPost.post('/', validateToken, validatePost, async (req, res) => {
  const { id } = req.user;
  const { title, content } = req.body;

  const newPost = {
    title,
    content,
    userId: id,
    published: new Date(),
    updated: new Date(),
  };

  await BlogPosts.create(newPost);

  res.status(201).json(newPost);
});

routerPost.delete('/me', validateToken, validateToken, async (req, res) => {
  const { id } = req.user;

  BlogPosts.destroy({ where: { id } });
  res.status(204).json({});
});

module.exports = routerPost;
