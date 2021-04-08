const { Router } = require('express');
const { validateToken } = require('../middlewares/auth');
const validatePost = require('../middlewares/validatePost');
const models = require('../models');

const postsRouter = Router();

postsRouter.get('/', async (_req, res) => {
  const posts = await models.BlogPosts.findAll({});
  return res.status(200).json(posts);
});

postsRouter.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload.data;
  try {
    const post = await models.BlogPosts.create({ title, content, userId: id });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

module.exports = postsRouter;
