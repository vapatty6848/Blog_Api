const { Router } = require('express');
const IsUserLoggedIn = require('../middlewares/IsUserLoggedIn');
const BlogPostService = require('../services/BlogPostService');
const BlogPostValidation = require('../middlewares/BlogPostValidation');
const FindBlogPostsService = require('../services/FindBlogPostsService');
const FindBlogPostService = require('../services/FindBlogPostService');

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

// BlogPostController.put('/:id', IsUserLoggedIn, async (req, res) => {
//   try {

//   } catch (e) {

//   }
// })

module.exports = BlogPostController;
