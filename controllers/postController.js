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
  try {
    const post = await models.Posts.create({ title, content, userId: id });
    return res.status(CREATED).json(post);
  } catch (err) {
    return res.status(NOT_FOUND).json({ message: err.message });
  }
});

PostRouter.get('/', auth.validateToken, async (req, res) => {
  const { id } = req.payload;
  const posts = await models.Posts.findAll({
    where: { userId: id },
    attributes: { exclude: 'userId' },
    include: { model: models.User, as: 'user', atributes: { exclude: 'password' } },
  });
  return res.status(SUCCESS).json(posts);
});

module.exports = PostRouter;
