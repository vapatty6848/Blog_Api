const { Router } = require('express');

const router = Router();
const { BlogPosts } = require('../models');
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

module.exports = router;
