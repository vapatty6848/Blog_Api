const { Router } = require('express');
const { Op } = require('sequelize');

const router = Router();
const { BlogPosts, Users } = require('../models');
const blogPostsService = require('../services/blogPostsService');
const { validateToken } = require('../auth/tokenConfig');

router.post('/post', blogPostsService.dataValidate, validateToken, async (req, res) => {
  const { id } = req.decodedUser;
  const { title, content } = req.body;

  const newDate = new Date().toLocaleString();

  const blogPost = await BlogPosts
    .create({ title, content, userId: id, published: newDate, updated: newDate });

  return res.status(201).json(blogPost);
});

router.get('/post', validateToken, async (req, res) => {
  const posts = await BlogPosts.findAll({
    attributes: { exclude: ['UserId'] },
    include: [{
      model: Users, as: 'user', attributes: { exclude: ['password'] },
    }],
  });

  return res.status(200).json(posts);
});

router.get('/post/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findByPk(id, {
    attributes: { exclude: ['UserId'] },
    include: [{
      model: Users, as: 'user', attributes: { exclude: ['password'] },
    }],
  });

  if (post) return res.status(200).json(post);
  return res.status(404).json({ message: 'Post não existe' });
});

router.put('/post/:id', blogPostsService.dataValidate, validateToken, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.decodedUser;

  const postId = await BlogPosts.findByPk(req.params.id);

  if (postId.userId !== id) return res.status(401).json({ message: 'Usuário não autorizado' });

  await BlogPosts.update(
    { title, content },
    { where: { id: req.params.id } },
  );

  // fiz mais um findByPk, pois o método update não retorna a resposta que o teste pede.
  const updatePost = await BlogPosts.findByPk(req.params.id, { attributes: ['title', 'content', 'userId'] });

  return res.status(200).json(updatePost);
});

router.get('/post/search?q=:searchTerm', validateToken, async (req, res) => {
  console.log('cheguei aqui 0');
  const { q } = req.query;
  console.log(q, 'cheguei aqui 1');

  const posts = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        { title: {
          [Op.like]: `%${q}%`,
        } },
        { content: {
          [Op.like]: `%${q}%`,
        } },
      ],
    },
    attributes: { exclude: ['UserId'] },
    include: [{
      model: Users, as: 'user', attributes: { exclude: ['password'] },
    }],
  });
  console.log(posts);
  if (!posts) return res.status(404).json({ message: 'Post não existe' });
  return res.status(200).json(posts);
});

router.delete('/post/:id', validateToken, async (req, res) => {
  const { id } = req.decodedUser;

  const postId = await BlogPosts.findByPk(req.params.id);
  if (!postId) return res.status(404).json({ message: 'Post não existe' });
  if (postId.userId !== id) return res.status(401).json({ message: 'Usuário não autorizado' });

  await BlogPosts.destroy(
    { where: { id: req.params.id } },
  );

  return res.status(204).end();
});

module.exports = router;
