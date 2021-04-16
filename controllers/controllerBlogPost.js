const { Router } = require('express');

const router = Router();
const { usersAuthorized } = require('../middlewares/Req1/validateToken');
const delPosts = require('../middlewares/BlogPosts/delPosts');
const { User } = require('../models');

const { createNewPost, listAllBlogPosts, postsId } = require('../services/blogPostsService');

const verifications = require('../middlewares/BlogPosts/verifications');

const putVerifications = require('../middlewares/BlogPosts/putVerifications');

const { updatePost, deletePost } = require('../services/blogPostsService');

router.post('/', usersAuthorized, verifications, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;
  const [{ dataValues: { id: userId } }] = await User.findAll({
    where: { email },
  });
  console.log('dataValues', userId);
  await createNewPost(title, content, userId);

  res.status(201).json({ title, content, userId });
});

router.get('/', usersAuthorized, async (req, res) => {
  const posts = await listAllBlogPosts();

  return res.status(200).json(posts);
});

router.get('/:id', usersAuthorized, async (req, res) => {
  const { id } = req.params;
  const [post] = await postsId(id);

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
});

router.put('/:id', usersAuthorized, putVerifications, async (req, res) => {
  const { content, title } = req.body;
  const { id } = req.params;
  const { email } = req.user;
  const [{ dataValues: { id: userId } }] = await User.findAll({
    where: { email },
  });
  const update = await updatePost(id, title, userId, content);
  if (!update) return res.status(401).json({ message: 'Usuário não autorizado' });
  return res.status(200).json(update);
});

router.delete('/:id', usersAuthorized, delPosts, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const [{ dataValues: { id: userId } }] = await User.findAll({
    where: { email },
  });

  const [post] = await postsId(id);

  if (!post) return res.status(404).json({ message: 'Post não existe' });
  const del = await deletePost(id, userId);
  if (!del) return res.status(401).json({ message: 'Usuário não autorizado' });
  return res.status(204).end();
});

module.exports = router;
