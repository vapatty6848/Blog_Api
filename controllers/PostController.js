const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authenticationMiddleware = require('../auth/authenticationMiddleware');
const { contentNeeded, titleNeeded } = require('../services/messages');
const { CREATED, BAD_REQUEST, SUCCESS, NOT_FOUND, UNATHORIZED,
  NO_CONTENT } = require('../services/httpStatuses');
const { BlogPost } = require('../models');
const { postDoesntExist } = require('../services/messages');

const PostController = new Router();

PostController.get('/', authenticationMiddleware, async (_req, res) => {
  const posts = await BlogPost.findAll({ include:
    { model: User, as: 'user', attributes: { exclude: 'password' } } });

  return res.status(SUCCESS).json(posts);
});

PostController.put('/:id', authenticationMiddleware, async (req, res) => {
  const { id: postId } = req.params;
  const { title, content } = req.body;
  const { authorization: token } = req.headers;
  const { id: loggedUserId } = jwt.decode(token);
  const post = await BlogPost.findByPk(postId);
  if (post.userId !== loggedUserId) {
    return res.status(UNATHORIZED).json({ message: 'Usuário não autorizado' });
  }

  if (!title) { return res.status(BAD_REQUEST).json(titleNeeded); }
  if (!content) { return res.status(BAD_REQUEST).json(contentNeeded); }

  return res.status(SUCCESS).json({ title, content, userId: post.userId });
});

PostController.delete('/:id', authenticationMiddleware, async (req, res) => {
  const { authorization: token } = req.headers;
  const { id: loggedUserId } = jwt.decode(token);
  const { id } = req.params;
  const post = await BlogPost.findByPk(id);
  if (post === null) {
    return res.status(NOT_FOUND).json({ message: 'Post não existe' });
  }
  if (post.userId && post.userId !== loggedUserId) {
    return res.status(UNATHORIZED).json({ message: 'Usuário não autorizado' });
  }
  await BlogPost.destroy({ where: { id } });
  return res.status(NO_CONTENT).send();
});

PostController.get('/:id', authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.findByPk(id, { include:
    {
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    } });
  if (post === null) {
    return res.status(NOT_FOUND).json(postDoesntExist);
  }
  return res.status(SUCCESS).json(post);
});

PostController.post('/', authenticationMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { authorization: token } = req.headers;
  const { id: userId } = jwt.decode(token);

  if (!title) { return res.status(BAD_REQUEST).json(titleNeeded); }
  if (!content) { return res.status(BAD_REQUEST).json(contentNeeded); }

  const post = await BlogPost.create({ title, content, userId });
  return res.status(CREATED).json(post);
});

module.exports = PostController;
