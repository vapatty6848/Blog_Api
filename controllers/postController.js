const { Router } = require('express');
const { BlogPosts, User } = require('../models');
const { validatePosts } = require('../validations/validatePosts');
const { validateToken } = require('../validations/validateToken');

const postsRouter = Router();

postsRouter.post('/', validateToken, validatePosts, async (request, response) => {
  const { title, content } = request.body;
  const { id } = request.user.data;
  const createdPost = await BlogPosts.create({ title, content, userId: id });
  return response.status(201).json(createdPost);
});

postsRouter.get('/', validateToken, async (request, response) => {
  const { id } = request.user.data;
  const posts = await BlogPosts.findAll({
    where: { userId: id },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  return response.status(200).json(posts);
});

postsRouter.get('/:id', validateToken, async (request, response) => {
  const { id: userId } = request.user.data;
  const { id } = request.params;
  const posts = await BlogPosts.findOne({
    where: { userId, id },
    attributes: { exclude: 'userId' },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  if (!posts) return response.status(404).json({ message: 'Post não existe' });
  return response.status(200).json(posts);
});

postsRouter.put('/:id', validateToken, validatePosts, async (request, response) => {
  const { title, content } = request.body;
  const { id: userId } = request.user.data;
  const { id } = request.params;

  const postToUpdate = await BlogPosts.findOne({ where: { id } });
  if (postToUpdate.userId !== userId) return response.status(401).json({ message: 'Usuário não autorizado' });

  await BlogPosts.update(
    { title, content },
    { where: { id } },
  );

  const postUpdated = await BlogPosts.findOne({ where: { id } });

  return response.status(200).json(postUpdated);
});

module.exports = postsRouter;
