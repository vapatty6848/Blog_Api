const { Router } = require('express');

const { User, BlogPost } = require('../models');
const { validatePostData } = require('../middlewares/validatePostData');
const { validateToken } = require('../auth/token');

const PostController = new Router();

PostController.get('/', validateToken, async (request, response) => {
  const { email } = request.user;
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;
  const posts = await BlogPost.findAll({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: { userId } });

  return response.status(200).json(posts);
});

PostController.get('/search', validateToken, async (request, response) => {
  console.log(request.query.q);
  return response.status(200).json({ message: 'PostController' });
});

PostController.get('/:id', validateToken, async (request, response) => {
  const { id } = request.params;
  const { email } = request.user;

  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;

  const post = await BlogPost.findOne({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: { id, userId } });
  if (!post) {
    return response.status(404).json({ message: 'Post não existe' });
  }
  return response.status(200).json(post);
});

PostController.post('/', validateToken, validatePostData, async (request, response) => {
  const { title, content } = request.body;
  const { email } = request.user;
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;
  const post = await BlogPost.create({ userId, title, content });
  return response.status(201).json(post);
});

PostController.put('/:id', validateToken, validatePostData, async (request, response) => {
  const { title, content } = request.body;
  const { email } = request.user;
  const { id } = request.params;
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;

  const post = await BlogPost.findOne({ where: { id } });
  if (!post) {
    return response.status(404).json({ message: 'Post não existe' });
  }
  if (post.dataValues.userId !== userId) {
    return response.status(401).json({ message: 'Usuário não autorizado' });
  }
  await BlogPost.update({ title, content }, { where: { userId, id } });
  return response.status(200).json({ title, content, userId });
});

PostController.delete('/:id', validateToken, async (request, response) => {
  const { email } = request.user;
  const { id } = request.params;
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;

  const post = await BlogPost.findOne({ where: { id } });
  if (!post) {
    return response.status(404).json({ message: 'Post não existe' });
  }
  if (post.dataValues.userId !== userId) {
    return response.status(401).json({ message: 'Usuário não autorizado' });
  }
  await BlogPost.destroy({ where: { userId, id } });
  return response.status(204).json();
});

module.exports = PostController;
