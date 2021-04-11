const { Router } = require('express');
const { BlogPost, User } = require('../models');
const {
  CREATED,
  OK,
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

BlogPostController.get(
  '/',
  validateToken,
  async (_request, response) => {
    const foundPosts = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'user',
        required: true,
      }],
    });
    // const { user: { email } } = request;
    // const recoveredUser = await User.findOne({ where: { email } });
    // blogPost.user = recoveredUser;
    // foundPosts.sort()
    foundPosts.sort((a, b) => a.id - b.id);
    // console.log(`posts`, foundPosts[0])

    response.status(OK).json(foundPosts);
  },
);

module.exports = BlogPostController;
