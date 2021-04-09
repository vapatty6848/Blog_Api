const { Router } = require('express');
const { validadeToken, validatePosts } = require('../services/serviceValidations');
const { BlogPosts } = require('../models');

const postRouter = Router();

postRouter.post('/', validadeToken, validatePosts, async (req, res) => {
  const { id } = req.user.data;
  const { title, content } = req.body;
  const post = await BlogPosts.create({ title, content, userId: id });
  return res.status(201).json(post);
});

module.exports = postRouter;
