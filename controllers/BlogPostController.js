const { Router } = require('express');
const MOMENT = require('moment');
const BlogPostService = require('../services/BlogPostService');
const statusCode = require('../dicts/statusCodesHTTP');
const {
  tokenValidation,
  blogpostValidation,
  userAuthorization,
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

router.get(
  '/',
  tokenValidation,
  async (request, response) => {
    const blogposts = await BlogPostService.getAll();
    return response.status(statusCode.OK).json(blogposts);
  },
);

router.get(
  '/:id',
  tokenValidation,
  async (request, response) => {
    const { id } = request.params;
    const retrievedBlogPost = await BlogPostService.getById(id);
    if (!retrievedBlogPost) {
      return response
        .status(statusCode.NOT_FOUND)
        .json({ message: 'Post não existe' });
    }
    return response.status(statusCode.OK).json(retrievedBlogPost);
  },
);

router.put(
  '/:id',
  tokenValidation,
  userAuthorization,
  blogpostValidation,
  async (request, response) => {
    const { id } = request.params;
    const { title, content } = request.body;
    const { id: userId } = response.locals.authenticatedUser;
    const updatedBlogPost = await BlogPostService.update(id, title, content);
    if (!updatedBlogPost) {
      return response
        .status(statusCode.NOT_FOUND).json({ message: 'Post não encontrado' });
    }
    return response.status(statusCode.OK).json({ title, content, userId });
  },
);

module.exports = router;
