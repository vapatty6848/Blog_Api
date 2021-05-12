const { Router } = require('express');

const blogPostService = require('../services/blogPostService');
const userService = require('../services/userService');
const { validatePost } = require('../middlewares/validatePostData');
const { validateToken } = require('../auth/token');

const router = new Router();

router.post('/', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const user = await userService.getUserByEmail(email);

  const userId = user.dataValues.id;

  const post = await blogPostService.createPost(userId, title, content);

  return res.status(201).json(post);
});

router.get('/', validateToken, async (req, res) => {
  const { email } = req.user;

  const user = await userService.getUserByEmail(email);

  const userId = user.dataValues.id;

  const posts = await blogPostService.getAllPostsByUser(userId);

  return res.status(200).json(posts);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const user = await userService.getUserByEmail(email);

  const userId = user.dataValues.id;

  const post = await blogPostService.getUserPostById(id);

  if (!post || post.dataValues.userId !== userId) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
});

router.put('/:id', validateToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;
  const { id } = req.params;

  const user = await userService.getUserByEmail(email);

  const userId = user.dataValues.id;

  const post = await blogPostService.getUserPostById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  if (post.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await blogPostService.updateUserPostById(userId, id, title, content);

  return res.status(200).json({ title, content, userId });
});

router.delete('/:id', validateToken, async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;

  const user = await userService.getUserByEmail(email);

  const userId = user.dataValues.id;

  const post = await blogPostService.getUserPostById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  if (post.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await blogPostService.deleteUserPostById(userId, id);

  return res.status(204).json();
});

module.exports = router;
