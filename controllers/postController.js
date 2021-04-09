const { Router } = require('express');
const { User, BlogPosts } = require('../models');
const { validateToken } = require('../auth');
const validatePost = require('../middlewares/validatePost');
// const findByEmail = require('../utils/findByEmail');

const routerPost = Router();

routerPost.get('/', validateToken, async (_req, res) => {
  BlogPosts.findAll({ include: { model: User, as: 'user' } })
    .then((posts) => {
      res.status(200).json(posts);
    });
});

routerPost.get('/:id', validateToken, async (req, res) => {
  const post = await BlogPosts.findByPk(
    req.params.id, { include: { model: User, as: 'user' } },
  );
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  res.status(200).json(post);
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

routerPost.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  console.log('aquiiiiiiii2', user.id);

  const post = await BlogPosts.findByPk(
    req.params.id, { include: { model: User, as: 'user' } },
  );
  console.log('aquiiiiiiii', post);
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  if (post.dataValues.userId !== user.id) return res.status(401).json({ message: 'Usuário não autorizado' });

  BlogPosts.destroy({ where: { id } });
  res.status(204).json({});
});

module.exports = routerPost;
