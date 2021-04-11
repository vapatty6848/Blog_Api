const { Router } = require('express');
const { User, BlogPost } = require('../models');
const { validatePost, validateToken, validatePostOwner } = require('../middlewares');
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

postRouter.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user' }],
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
});

postRouter.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user' }],
  });

  return res.status(200).json(posts);
});

postRouter.put('/:id', validateToken,
  validatePost, validatePostOwner, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    await BlogPost.update(
      { title, content },
      { where: { id } },
    );

    const updatedUser = await BlogPost.findOne({
      where: { id },
      attributes: { exclude: ['id', 'published', 'updated'] },
    });

    return res.status(200).json(updatedUser);
  });

module.exports = postRouter;
