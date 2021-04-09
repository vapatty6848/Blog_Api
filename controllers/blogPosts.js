const { Router } = require('express');
const { CREATED, OK, NOT_FOUND } = require('../dictionary/statusCode');
const { BlogPost, User } = require('../models');
const validateToken = require('../auth/validateToken');
const Validation = require('../middlewares/blogPostValidation');
const { POST_NOT_FOUND } = require('../dictionary/errorMessage');

const blogPostsRouter = new Router();

blogPostsRouter.post(
  '/',
  validateToken,
  Validation.requiredInfo,
  async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const creationDate = new Date();

    await BlogPost.create({
      title, content, userId, published: creationDate, updated: creationDate,
    });

    const response = { title, content, userId };

    return res.status(CREATED).json(response);
  },
);

blogPostsRouter.get(
  '/',
  validateToken,
  async (_req, res) => {
    const posts = await BlogPost.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      attributes: { exclude: ['userId'] },
    });

    return res.status(OK).json(posts);
  },
);

blogPostsRouter.get(
  '/:id',
  validateToken,
  async (req, res) => {
    const post = await BlogPost.findAll({
      where: { id: req.params.id },
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      attributes: { exclude: ['userId'] },
    });
    const postNotFound = !post.length;

    if (postNotFound) return res.status(NOT_FOUND).json(POST_NOT_FOUND);

    return res.status(OK).json(post[0]);
  },
);

blogPostsRouter.put(
  '/:id',
  validateToken,
  Validation.requiredInfo,
  Validation.blogPostAuthor,
  async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const response = { title, content, userId };

    await BlogPost.update(
      { title, content },
      { where: { id: req.params.id } },
    );

    return res.status(OK).json(response);
  },
);

module.exports = blogPostsRouter;
