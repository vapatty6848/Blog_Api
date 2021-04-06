const { Router } = require('express');

const BlogPostsController = Router();

const { BlogPost } = require('../models');

BlogPostsController.get('/', async (req, res) => {
  const users = await BlogPost.findAll();

  res.status(200).json(users);
});

module.exports = BlogPostsController;
