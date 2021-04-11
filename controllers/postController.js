const { Router } = require('express');
const { BlogPosts, User } = require('../models');
const { validateToken } = require('../services/authorization');
const { validatePost } = require('../services/postService');

const postRouter = Router();

postRouter.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.payload;

  try {
    const post = await BlogPosts.create({ title, content, userId });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

postRouter.get('/', validateToken, async (req, res) => {
  const { id: userId } = req.payload;
  const allPosts = await BlogPosts.findAll({
    where: { userId },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });

  return res.status(200).json(allPosts);
});

module.exports = postRouter;
