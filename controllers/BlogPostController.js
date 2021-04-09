const { Router } = require('express');
const MOMENT = require('moment');
const BlogPostService = require('../services/BlogPostService');
const statusCode = require('../dicts/statusCodesHTTP');
const {
  tokenValidation,
  blogpostValidation,
} = require('../middlewares');

const router = Router();

router.post(
  '/',
  tokenValidation,
  blogpostValidation,
  async (request, response) => {
    const { title, content } = request.body;
    const published = MOMENT().format('YYYY-MM-DD HH:mm:ss');
    const updated = MOMENT().format('YYYY-MM-DD HH:mm:ss');
    const { id: userId } = response.locals.authenticatedUser;
    const newBlogpost = { title, content, published, updated, userId };
    const createdBlogPost = await BlogPostService.create(newBlogpost);
    return response.status(statusCode.CREATED).json(createdBlogPost);
  },
);

module.exports = router;
