const { Router } = require('express');
const models = require('../models');
const auth = require('../middlewares/auth');
const { validatePost } = require('../middlewares/validadePost');

const NOT_FOUND = 404;
const SUCCESS = 200;
const CREATED = 201;

const PostRouter = new Router();

PostRouter.post('/', validatePost, auth.validateToken, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload;
  console.log(req.payload);
  try {
    const post = await models.BlogPosts.create({ title, content, userId: id });
    return res.status(CREATED).json(post);
  } catch (err) {
    return res.status(NOT_FOUND).json({ message: err.message });
  }
});

PostRouter.get('/', auth.validateToken, async (req, res) => {
  const posts = await models.BlogPosts.findAll({
    attributes: { exclude: 'userId' },
    // include: { model: models.User, as: 'user' },
    include: { model: models.User, as: 'user', attributes: { exclude: 'password' } },
  });
  return res.status(SUCCESS).json(posts);
});

PostRouter.get('/:id', auth.validateToken, async (req, res) => {
  const { id: userId } = req.payload;
  const { id } = req.params;

  const posts = await models.BlogPosts.findOne({
    where: { userId, id },
    attributes: { exclude: 'userId' },
    include: { model: models.User, as: 'user', attributes: { exclude: 'password' } },
  });
  if (!posts) return res.status(404).json({ message: 'Post não existe' });
  return res.status(200).json(posts);
});

module.exports = PostRouter;
