const { Router } = require('express');

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

module.exports = router;
