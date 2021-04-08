const { Router } = require('express');
const { BlogPosts, Users } = require('../models');
const service = require('../services/postsService');
const { validateToken, decodeToken } = require('../services/token');

const router = Router();

router.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPosts.findAll({
    attributes: { exclude: 'userId' },
    include: { model: Users, as: 'user', attributes: { exclude: 'password' } },
  });

  res.status(200).json(posts);
});

router.post('/', validateToken, service.validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;

  const { id } = decodeToken(authorization);
  const post = await BlogPosts.create({ title, content, userId: id });

  return res.status(201).json({ title: post.title, content: post.content, userId: post.userId });
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const posts = await BlogPosts.findOne({
    where: { id },
    attributes: { exclude: 'userId' },
    include: { model: Users, as: 'user', attributes: { exclude: 'password' } },
  });
  if (!posts) return res.status(404).json({ message: 'Post não existe' });

  res.status(200).json(posts);
});

router.put('/:id', validateToken, service.validateUpdate, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  await BlogPosts.update({ title, content }, { where: { id } });
  const post = await BlogPosts.findOne({ where: { id } });

  res.status(200).json({ title: post.title, content: post.content, userId: post.userId });
});

router.get('/search?q=:searchTerm', validateToken, async (req, res) => {
  const { searchTerm } = req.query;

  // const posts = await BlogPosts.findOne({
  //   where: { id },
  //   attributes: { exclude: 'userId' },
  //   include: { model: Users, as: 'user', attributes: { exclude: 'password' }}
  // });

  res.status(200).json(searchTerm);
});

router.delete('/:id', validateToken, service.validateDelete, async (req, res) => {
  const { id } = req.params;

  await BlogPosts.destroy({ where: { id } });

  res.status(204).end();
});

module.exports = router;
