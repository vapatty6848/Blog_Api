const { Router } = require('express');
const { CREATED } = require('../dictionary/statusCode');
const { BlogPost } = require('../models');
const validateToken = require('../auth/validateToken');
const Validation = require('../middlewares/blogPostValidation');

const blogPostsRouter = new Router();

blogPostsRouter.post(
  '/',
  validateToken,
  Validation.requiredInfo,
  async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const creationDate = new Date();

    const newBlogPost = await BlogPost.create({
      title, content, userId, published: creationDate, updated: creationDate,
    });

    // ['id', 'published', 'updated'].forEach((key) => delete newBlogPost[key]);

    const response = {
      title: newBlogPost.title,
      content: newBlogPost.content,
      userId: newBlogPost.userId,
    };

    return res.status(CREATED).json(response);
  },
);

module.exports = blogPostsRouter;
