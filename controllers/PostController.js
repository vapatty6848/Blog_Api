const { Router } = require('express');
const { BlogPost } = require('../models');

const PostController = Router();
PostController.post('/', async (req, res) => {
  const { title, content } = req.body;
  const now = new Date();
  await BlogPost.create({ title, content, userId: req.validUser.id, published: now, updated: now });
  res.status(201).json({ title, content, userId: req.validUser.id });
});

module.exports = PostController;
