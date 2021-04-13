const { Router } = require('express');
const AuthorizationUsers = require('../middlewares/authenticates');
const validatedBlogPosts = require('../middlewares/validatedPosts');
const { createNewPost, listPosts, listPostsId, editPosts, postDelete } = require('../services/PostsServices');

const BlogPostsController = new Router();

BlogPostsController.post('/', validatedBlogPosts, AuthorizationUsers, async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;
  // console.log('user', req.body, 'user', userId, req.user);
  await createNewPost(title, content, userId);
  return res.status(201).json({
    title,
    content,
    userId,
  });
});

BlogPostsController.get('/:id', AuthorizationUsers, async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  const [post] = await listPostsId(id, userId);
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  return res.status(200).json(post);
});

BlogPostsController.get('/', AuthorizationUsers, async (req, res) => {
  const post = await listPosts();
  return res.status(200).json(post);
});

BlogPostsController.put('/:id', validatedBlogPosts, AuthorizationUsers, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, content } = req.body;
  const post = await editPosts(id, title, content, userId);
  console.log('put\n\n', post, userId);
  // if (!post) return res.status(404).json({ message: 'Post não existe' });
  if (!post) return res.status(401).json({ message: 'Usuário não autorizado' });
  return res.status(200).json({
    title,
    content,
    userId,
  });
});

BlogPostsController.delete('/:id', AuthorizationUsers, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const [post] = await listPostsId(id, userId);
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  const postDel = await postDelete(id, userId);
  if (!postDel) return res.status(401).json({ message: 'Usuário não autorizado' });
  return res.status(204).json();
});

module.exports = BlogPostsController;
