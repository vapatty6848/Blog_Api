const { Router } = require('express');
const { validadeToken, validatePosts } = require('../services/serviceValidations');
const { User, BlogPosts } = require('../models');

const postRouter = Router();

postRouter.post('/', validadeToken, validatePosts, async (req, res) => {
  const { id } = req.user.data;
  const { title, content } = req.body;
  const post = await BlogPosts.create({ title, content, userId: id });
  return res.status(201).json(post);
});

postRouter.get('/', validadeToken, async (req, res) => {
  const { id } = req.user.data;
  const allPosts = await BlogPosts.findAll({
    where: { userId: id },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  if (!allPosts) return res.status(404).json({ message: 'Post não existe' });
  // console.log(`blogPost ${BlogPosts}`);
  // console.log(`allPosts ${allPosts}`);
  return res.status(200).json(allPosts);
});
postRouter.get('/:id', validadeToken, async (req, res) => {
  const { id: userId } = req.user.data;
  const { id } = req.params;
  const onePost = await BlogPosts.findOne({
    where: { userId, id },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  if (!onePost) return res.status(404).json({ message: 'Post não existe' });
  return res.status(200).json(onePost);
});
postRouter.put('/:id', validadeToken, validatePosts, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.user.data;
  const { id } = req.params;

  const update = await BlogPosts.findOne({ where: { id } });
  if (update.userId !== userId) return res.status(401).json({ message: 'Usuário não autorizado' });

  await BlogPosts.update({ title, content }, { where: { id } });

  const postUpdated = await BlogPosts.findOne({ where: { id } });

  return res.status(200).json(postUpdated);
});

module.exports = postRouter;
