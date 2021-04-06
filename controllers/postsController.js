const { Router } = require('express');
const { validateToken } = require('../middlewares/auth');
const validatePost = require('../middlewares/validatePost');
const models = require('../models');

const postsRouter = Router();

postsRouter.get('/', validateToken, async (req, res) => {
  const { id } = req.payload.data;
  const posts = await models.BlogPosts.findAll({
    where: { userId: id },
    attributes: { exclude: 'userId' },
    include: { model: models.User, as: 'user', attributes: { exclude: 'password' } },
  });
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
