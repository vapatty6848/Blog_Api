const Router = require('express');
const validateAuth = require('../middlewares/validations/validateAuth');
const validateBlogs = require('../middlewares/validations/validateBlogs');
const BlogsService = require('../services/BlogsService');

const BlogPostController = Router();

BlogPostController.post('/', validateAuth, validateBlogs, async (req, res, next) => {
  const { id: userId } = res.locals.user;
  const { title, content } = req.body;
  try {
    const blog = await BlogsService.createBlog({ title, userId, content });
    res.status(201).json(blog);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = BlogPostController;
