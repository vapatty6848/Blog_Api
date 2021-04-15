const { Router } = require('express');

const router = Router();
const { usersAuthorized } = require('../middlewares/Req1/validateToken');

const { User, BlogPost } = require('../models');

const { createNewPost, listAllBlogPosts, postsId } = require('../services/blogPostsService');

const verifications = require('../middlewares/BlogPosts/verifications');

const putVerifications = require('../middlewares/BlogPosts/putVerifications');

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
  // const { email } = req.user;
  // const result = await User.findAll({
  //   where: { email },
  // });
  // console.log('resut', result);
  return res.status(200).json(posts);
});

router.get('/:id', usersAuthorized, async (req, res) => {
  const { id } = req.params;
  const [post] = await postsId(id);

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
});

router.put('/id', usersAuthorized, putVerifications, async (req, res) => {
  // const { id } = req.params;
  const { email } = req.user;
  const { title, content } = req.body;
  const [{ dataValues: { id: userId } }] = await User.findAll({
    where: { email },
  });

  await BlogPost.update(title, content, userId);
  return res.status(200).json({ title, content, userId });
});

module.exports = router;
