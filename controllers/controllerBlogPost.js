const { Router } = require('express');

const router = Router();
const { usersAuthorized } = require('../middlewares/Req1/validateToken');

const { createNewPost, listAllBlogPosts, postsId } = require('../services/blogPostsService');

const verifications = require('../middlewares/BlogPosts/verifications');
const getByIdPosts = require('../middlewares/BlogPosts/getByIdPosts');

router.post('/', usersAuthorized, verifications, async (req, res) => {
  const { title, content } = req.body;
  const { user } = req.user;

  await createNewPost(title, content, user);

  res.status(201).json({ title, content, user });
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
