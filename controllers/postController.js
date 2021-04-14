const { Router } = require('express');
const { validateToken } = require('../middlewares/auth');
const validatePost = require('../middlewares/validatePost');
const models = require('../models');
const { OK, CREATED, UNAUTHORIZED, NOT_FOUND } = require('../helper/statusCodes');

const postsRouter = Router();

postsRouter.get('/', validateToken, async (req, res) => {
  const { id } = req.payload.data;
  const posts = await models.BlogPosts.findAll({
    where: { userId: id },
    attributes: { exclude: 'userId' },
    include: { model: models.User, as: 'user', attributes: { exclude: 'password' } },
  });
  return res.status(OK).send(posts);
});

postsRouter.get('/:id', validateToken, async (req, res) => {
  const { id: userId } = req.payload.data;
  const { id } = req.params;

  const posts = await models.BlogPosts.findOne({
    where: { userId, id },
    attributes: { exclude: 'userId' },
    include: { model: models.User, as: 'user', attributes: { exclude: 'password' } },
  });
  if (!posts) return res.status(NOT_FOUND).send({ message: 'Post não existe' });
  return res.status(OK).send(posts);
});

postsRouter.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload.data;
  try {
    const post = await models.BlogPosts.create({ title, content, userId: id });
    return res.status(CREATED).send(post);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: err.message });
  }
});

postsRouter.put('/:id', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.payload.data;
  const { id } = req.params;

  const editedPost = await models.BlogPosts.findOne({ where: { id } });
  if (editedPost.userId !== userId) return res.status(401).send({ message: 'Usuário não autorizado' });
  editedPost.title = title;
  editedPost.content = content;
  await editedPost.save();
  return res.status(OK).send({ title, content, userId });
});

module.exports = postsRouter;
