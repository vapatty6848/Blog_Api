const { Router } = require('express');
const { User, BlogPost } = require('../models');
const { validatePost, validateToken } = require('../middlewares');
const verifyToken = require('../auth/verifyToken');

const postRouter = new Router();

postRouter.post('/', validateToken, validatePost, async (req, res) => {
  const token = req.headers.authorization;

  const { title, content } = req.body;

  const { email } = verifyToken(token);

  const user = await User.findOne({ where: { email } });

  const userId = Number(user.dataValues.id);

  const date = new Date();

  await BlogPost.create({
    title,
    content,
    userId,
    published: date,
    updated: date,
  })
    .then(() => res.status(201).json({ title, content, userId }));
});

postRouter.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user' }],
  });

  return res.status(200).json(posts);
});

module.exports = postRouter;
