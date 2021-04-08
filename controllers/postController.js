const express = require('express');
const { BlogPosts, User } = require('../models');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validateToken, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.decodedUser;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  const newPost = await BlogPosts.create({ userId: id, title, content });
  res.status(201).json(newPost);
});

router.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPosts.findAll({ include: { model: User, as: 'user' } });
  res.status(200).json(posts);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const post = await BlogPosts.findOne({
    where: { id },
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  if (!post) return res.status(404).send({ message: 'Post não existe' });
  res.status(200).json(post);
});

module.exports = router;
