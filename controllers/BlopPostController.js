const { Router } = require('express');
const IsUserLoggedIn = require('../middlewares/IsUserLoggedIn');
const BlogPostService = require('../services/BlogPostService');
const BlogPostValidation = require('../middlewares/BlogPostValidation');
const FindBlogPostsService = require('../services/FindBlogPostsService');
const FindBlogPostService = require('../services/FindBlogPostService');
const BlogPostUpdateService = require('../services/BlogPostUpdateService');
const DeleteBlogPostService = require('../services/DeleteBlogPostService');
const UserChecker = require('../middlewares/UserChecker');

const BlogPostController = Router();

BlogPostController.post('/', IsUserLoggedIn, BlogPostValidation, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { dataValues: { id } } = req.user;
    await BlogPostService(title, content, id);
    return res.status(201).json({ title, content, userId: id });
  } catch (e) {
    console.log(e, 'error');
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

BlogPostController.get('/', IsUserLoggedIn, async (req, res) => {
  try {
    const { dataValues: { id } } = req.user;
    const blogPosts = await FindBlogPostsService(id);
    return res.status(200).json(blogPosts);
  } catch (e) {
    console.log(e.message);
    return res.status(404).json({ message: 'Post não existe' });
  }
});

BlogPostController.get('/:id', IsUserLoggedIn, async (req, res) => {
  try {
    const { dataValues: { id: userId } } = req.user;
    const { id: blogPostId } = req.params;
    const blogPosts = await FindBlogPostService(parseFloat(userId), parseFloat(blogPostId));
    return res.status(200).json(blogPosts);
  } catch (e) {
    console.log(e.message);
    return res.status(404).json({ message: 'Post não existe' });
  }
});

BlogPostController.put(
  '/:id',
  IsUserLoggedIn,
  BlogPostValidation,
  UserChecker,
  async (req, res) => {
    try {
      const { dataValues: { id: userId } } = req.user;
      const { title, content } = req.body;
      const { id: blogPostId } = req.params;
      await BlogPostUpdateService(title, content, userId, blogPostId);
      return res.status(200).json({ title, content, userId });
    } catch (e) {
      console.log(e);
    }
  },
);

BlogPostController.delete(
  '/:id',
  IsUserLoggedIn,
  UserChecker,
  async (req, res) => {
    try {
      const { dataValues: { id: userId } } = req.user;
      const { id: blogPostId } = req.params;
      await DeleteBlogPostService(userId, blogPostId);
      return res.status(204).json();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

module.exports = BlogPostController;
