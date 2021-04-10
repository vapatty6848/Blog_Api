const { Router } = require('express');
const { BlogPost } = require('../models');
const { User } = require('../models');
const {
  CREATED,
} = require('../dictionary/statusCodes');
const {
  validateContentIsRequired,
  validateTitleIsRequired,
  validateToken,
} = require('../validation/validations');

const BlogPostController = new Router();

BlogPostController.post(
  '/',
  validateToken,
  validateTitleIsRequired,
  validateContentIsRequired,
  async (request, response) => {
    const blogPost = request.body;
    const { user: { email } } = request;
    const recoveredUser = await User.findOne({ where: { email } });
    blogPost.userId = recoveredUser.id;
    blogPost.published = Date();
    blogPost.updated = Date();

    const createdBlogPost = await BlogPost.create(blogPost);

    response.status(CREATED).json(createdBlogPost);
  },
);

module.exports = BlogPostController;
