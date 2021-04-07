const { Router } = require('express');
const { validateToken } = require('../middlewares/auth');
const { validatePost } = require('../middlewares/validatePost');
const { User, BlogPosts } = require('../models');

const PostRouter = new Router();

PostRouter.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload.data;
  try {
    const post = await BlogPosts.create({ title, content, userId: id });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

PostRouter.get('/', validateToken, async (req, res) => {
  const { id } = req.payload.data;
  const posts = await BlogPosts.findAll({
    where: { userId: id },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  return res.status(200).json(posts);
});

PostRouter.get('/:id', validateToken, async (req, res) => {
  const { id: userId } = req.payload.data;
  const { id } = req.params;

  const posts = await BlogPosts.findOne({
    where: { userId, id },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  if (!posts) return res.status(404).json({ message: 'Post não existe' });
  return res.status(200).json(posts);
});

PostRouter.put('/:id', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.payload.data;
  const { id } = req.params;

  const editedPost = await BlogPosts.findOne({ where: { id } });
  if (editedPost.userId !== userId) return res.status(401).json({ message: 'Usuário não autorizado' });
  editedPost.title = title;
  editedPost.content = content;
  await editedPost.save();
  return res.status(200).json({ title, content, userId });
});

module.exports = { PostRouter };
