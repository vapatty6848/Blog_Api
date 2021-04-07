const { Router } = require('express');
const { validateToken } = require('../middlewares/auth');
const { validatePost } = require('../middlewares/validatePost');
const { User, BlogPosts } = require('../models');

const PostRouter = new Router();

PostRouter.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload.data;
  try {
    const post = await BlogPosts.create({ title, content, userId: id });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

PostRouter.get('/', validateToken, async (req, res) => {
  const { id } = req.payload.data;
  const posts = await BlogPosts.findAll({
    where: { userId: id },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  return res.status(200).json(posts);
});

module.exports = { PostRouter };
