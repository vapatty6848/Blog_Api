const { Router } = require('express');
const { BlogPosts, User } = require('../models');
const { validateToken } = require('../services/authorization');
const { validatePost } = require('../services/postService');

const postRouter = Router();

postRouter.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.payload;

  try {
    const post = await BlogPosts.create({ title, content, userId });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

postRouter.get('/', validateToken, async (req, res) => {
  const { id: userId } = req.payload;
  const allPosts = await BlogPosts.findAll({
    where: { userId },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });

  return res.status(200).json(allPosts);
});

postRouter.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const post = await BlogPosts.findOne({
    where: { id },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
});

postRouter.put('/:id', validateToken, validatePost, async (req, res) => {
  const { id: userId } = req.payload;
  const { id } = req.params;
  const { title, content } = req.body;

  const postToUpdate = await BlogPosts.findOne({ where: { id } });
  if (postToUpdate.userId !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  try {
    postToUpdate.title = title;
    postToUpdate.content = content;
    await postToUpdate.save();
    await postToUpdate.reload();
    return res.status(200).json(postToUpdate);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = postRouter;
