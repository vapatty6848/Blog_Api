const { Router } = require('express');
const { validToken } = require('../middleware/valid.TokenJWT');
const { validPost } = require('../middleware/valid.post');
const { User, BlogPosts } = require('../models');

const postControll = new Router();

postControll.post('/', validToken, validPost, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload.data;
  try {
    const post = await BlogPosts.create({ title, content, userId: id });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

const createPosts = (result) => ({
  where: result,
  attributes: { exclude: 'userId' },
  include: { model: User, as: 'user', attributes: { exclude: 'password' } },
});

postControll.get('/:id', validToken, async (req, res) => {
  const { id: userId } = req.payload.data;
  const { id } = req.params;
  const result = { userId, id };
  const posts = await BlogPosts.findOne(createPosts(result));
  if (!posts) return res.status(404).json({ message: 'Post não existe' });
  return res.status(200).json(posts);
});

postControll.get('/', validToken, async (req, res) => {
  const { id } = req.payload.data;
  const result = { userId: id };
  const posts = await BlogPosts.findAll(createPosts(result));
  return res.status(200).json(posts);
});

postControll.put('/:id', validToken, validPost, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.payload.data;
  const { id } = req.params;
  const editPost = await BlogPosts.findOne({ where: { id } });
  if (editPost.userId !== userId) return res.status(401).json({ message: 'Usuário não autorizado' });
  editPost.title = title;
  editPost.content = content;
  await editPost.save();
  return res.status(200).json({ title, content, userId });
});

module.exports = { postControll };
