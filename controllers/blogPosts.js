const { Router } = require('express');
const { CREATED, OK } = require('../dictionary/statusCode');
const { BlogPost, User } = require('../models');
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

module.exports = blogPostsRouter;
