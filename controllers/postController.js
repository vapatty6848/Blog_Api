const { Router } = require('express');

const router = Router();
const { BlogPosts, Users } = require('../models');
const blogValidation = require('../services/validations');
const { validateToken } = require('../auth/token');

router.post('/post', blogValidation.validatePost, validateToken, async (req, res) => {
  const { id } = req.decodedUser;
  const { title, content } = req.body;
  const date = new Date().toLocaleString();
  const blogPost = await BlogPosts
    .create({ title, content, userId: id, published: date, updated: date });
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
  try {
    const post = await BlogPosts.findAll({
      where: { id: req.params.id },
      include: [{
        model: Users, as: 'user', attributes: { exclude: ['password'] },
      }],
      attributes: { exclude: ['userId'] },
    });
    if (post.length > 0) return res.status(200).json(post[0]);
    return res.status(404).json({ message: 'Post não existe' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
