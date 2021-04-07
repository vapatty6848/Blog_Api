const { Router } = require('express');
const { validateToken } = require('../middlewares/auth');
const { validatePost } = require('../middlewares/validatePost');
const { BlogPosts } = require('../models');

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

module.exports = { PostRouter };
