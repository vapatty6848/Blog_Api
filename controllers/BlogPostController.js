const BlogPostController = require('express').Router();
const { postValidationRules, validatePost } = require('../middlewares/validatePost');
const BlogPostServices = require('../services/BlogPostServices');

BlogPostController.get('/', async (req, res) => {
  const { status, message } = await BlogPostServices.findAllPosts();

  res.status(status).json(message);
});

BlogPostController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, message, post } = await BlogPostServices.findPost(id);

  return (!post) ? res.status(status).json({ message }) : res.status(status).json(post);
});

BlogPostController.post('/', postValidationRules(), validatePost, async (req, res) => {
  const data = req.body;
  const { id } = req.user;

  data.userId = id;

  const { status, message } = await BlogPostServices.newPost(data);

  res.status(status).json(message);
});

module.exports = BlogPostController;
