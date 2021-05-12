const { Router } = require('express');

const { validatePostData } = require('../middlewares/validatePostData');
const { validateToken } = require('../auth/token');
const { getUserByEmail } = require('../services/UserService');
const { getAllPostsByUser, getUserPostsBySearchTerm, getUserPostById, createPost, updateUserPostById, deleteUserPostById } = require('../services/BlogPostService');

const PostController = new Router();

PostController.get('/', validateToken, async (request, response) => {
  const { email } = request.user;
  const user = await getUserByEmail(email);
  const userId = user.dataValues.id;
  const posts = await getAllPostsByUser(userId);
  return response.status(200).json(posts);
});

PostController.get('/search', validateToken, async (request, response) => {
  const searchTerm = request.query.q;
  const { email } = request.user;
  const user = await getUserByEmail(email);
  const userId = user.dataValues.id;
  const posts = await getUserPostsBySearchTerm(userId, searchTerm);
  return response.status(200).json(posts);
});

PostController.get('/:id', validateToken, async (request, response) => {
  const { id } = request.params;
  const { email } = request.user;
  const user = await getUserByEmail(email);
  const userId = user.dataValues.id;
  const post = await getUserPostById(id);
  if (!post || post.dataValues.userId !== userId) {
    return response.status(404).json({ message: 'Post não existe' });
  }
  return response.status(200).json(post);
});

PostController.post('/', validateToken, validatePostData, async (request, response) => {
  const { title, content } = request.body;
  const { email } = request.user;
  const user = await getUserByEmail(email);
  const userId = user.dataValues.id;
  const post = await createPost(userId, title, content);
  return response.status(201).json(post);
});

PostController.put('/:id', validateToken, validatePostData, async (request, response) => {
  const { title, content } = request.body;
  const { email } = request.user;
  const { id } = request.params;
  const user = await getUserByEmail(email);
  const userId = user.dataValues.id;
  const post = await getUserPostById(id);
  if (!post) {
    return response.status(404).json({ message: 'Post não existe' });
  }
  if (post.dataValues.userId !== userId) {
    return response.status(401).json({ message: 'Usuário não autorizado' });
  }
  await updateUserPostById(userId, id, title, content);
  return response.status(200).json({ title, content, userId });
});

PostController.delete('/:id', validateToken, async (request, response) => {
  const { email } = request.user;
  const { id } = request.params;
  const user = await getUserByEmail(email);
  const userId = user.dataValues.id;
  const post = await getUserPostById(id);
  if (!post) {
    return response.status(404).json({ message: 'Post não existe' });
  }
  if (post.dataValues.userId !== userId) {
    return response.status(401).json({ message: 'Usuário não autorizado' });
  }
  await deleteUserPostById(userId, id);
  return response.status(204).json();
});

module.exports = PostController;
