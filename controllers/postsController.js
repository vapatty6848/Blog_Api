const { Router } = require('express');
const { BlogPosts } = require('../models');
const service = require('../services/postsService');
const { validateToken, decodeToken } = require('../services/token');

const router = Router();

router.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPosts.findAll();

  res.status(200).json(posts);
});

router.post('/', validateToken, service.validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;

  const { id } = decodeToken(authorization);
  const post = await BlogPosts.create({ title, content, userId: id });

  return res.status(201).json(post);
});

module.exports = router;
