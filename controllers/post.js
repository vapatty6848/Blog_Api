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

postRouter.put('/:id', validadeToken, validatePosts, async (request, response) => {
  const { title, content } = request.body;
  const { id: userId } = request.user.data;
  const { id } = request.params;

  const update = await BlogPosts.findOne({ where: { id } });
  if (update.userId !== userId) return response.status(401).json({ message: 'Usuário não autorizado' });

  await BlogPosts.update({ title, content }, { where: { id } });

  const postUpdated = await BlogPosts.findOne({ where: { id } });

  return response.status(200).json(postUpdated);
});

module.exports = postRouter;
