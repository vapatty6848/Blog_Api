const { Router } = require('express');
const { Op } = require('sequelize');
const { CREATED, OK, NOT_FOUND, UNAUTHORIZED, NO_CONTENT } = require('../dictionary/statusCode');
const { BlogPost, User } = require('../models');
const validateToken = require('../auth/validateToken');
const Validation = require('../middlewares/blogPostValidation');
const { POST_NOT_FOUND, USER_NOT_AUTHORIZED } = require('../dictionary/errorMessage');

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
  '/search',
  validateToken,
  async (req, res) => {
    const { q } = req.query;
    const searchTerm = `%${q.split(' ').join('%')}%`;

    const posts = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { content: { [Op.like]: searchTerm } },
          { title: { [Op.like]: searchTerm } },
        ],
      },
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
  async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const { id: postId } = req.params;
    const response = { title, content, userId };

    const notAuthorized = !(await BlogPost.findAll({ where: { id: postId, userId } })).length;

    if (notAuthorized) return res.status(UNAUTHORIZED).json(USER_NOT_AUTHORIZED);

    await BlogPost.update(
      { title, content },
      { where: { id: postId } },
    );

    return res.status(OK).json(response);
  },
);

blogPostsRouter.delete(
  '/:id',
  validateToken,
  async (req, res) => {
    const postToDelete = await BlogPost.findAll({ where: { id: req.params.id } });
    const postNotFound = !postToDelete.length;

    if (postNotFound) return res.status(NOT_FOUND).json(POST_NOT_FOUND);

    const unauthorizedUser = postToDelete[0].dataValues.userId !== req.user.id;

    if (unauthorizedUser) return res.status(UNAUTHORIZED).json(USER_NOT_AUTHORIZED);

    await postToDelete[0].destroy();

    return res.status(NO_CONTENT).json();
  },
);

module.exports = blogPostsRouter;
