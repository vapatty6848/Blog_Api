const { Router } = require('express');

const router = Router();
const { usersAuthorized } = require('../middlewares/Req1/validateToken');

const { User } = require('../models');

const { createNewPost, listAllBlogPosts, postsId } = require('../services/blogPostsService');

const verifications = require('../middlewares/BlogPosts/verifications');
const getByIdPosts = require('../middlewares/BlogPosts/getByIdPosts');

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

router.get('/', usersAuthorized, async (_req, res) => {
  const posts = await listAllBlogPosts();

  return res.status(200).json(posts);
});

router.get('/:id', usersAuthorized, getByIdPosts, async (req, res) => {
  const { id } = req.params;
  // const token = req.headers.authorization;
  const [post] = await postsId(id);

  return res.status(200).json(post);
});

module.exports = router;
