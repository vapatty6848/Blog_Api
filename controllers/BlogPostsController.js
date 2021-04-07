const { Router } = require('express');
const rescue = require('express-rescue');

const { validateToken } = require('../middlewares/tokenValidation');
const { validateTitle, validateContent } = require('../middlewares/blogPostValidation');

const BlogPostsController = Router();

const { BlogPost } = require('../models');

BlogPostsController.get('/', async (req, res) => {
  const users = await BlogPost.findAll();

  res.status(200).json(users);
});

BlogPostsController.post('/', validateToken, validateTitle, validateContent, rescue(async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  let published;

  await BlogPost.create({ title, content, userId, published });

  res.status(201).json({ title, content, userId });
}));

module.exports = BlogPostsController;
