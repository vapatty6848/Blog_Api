const { Router } = require('express');
const blogPostService = require('../services/blogPostService');
const tokenIsValid = require('../middlewares/tokenValidation');
const validatePost = require('../middlewares/blogpostValidation');

const router = Router();

const CREATE = 201;
const OK = 200;
// const NO_CONTENT = 204;

router.get('/', tokenIsValid, async (req, res) => {
  const foundPost = await blogPostService.findAllPosts();

  return res.status(OK).json(foundPost);
});

router.get('/:id', tokenIsValid, async (req, res) => {
  const { id } = req.params;
  const foundPost = await blogPostService.findPostsById(id);
  if (foundPost.isError) {
    return res.status(foundPost.status).json({ message: foundPost.message });
  }

  res.status(OK).json(foundPost);
});

router.post('/', tokenIsValid, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const newPost = await blogPostService.createPost({ title, content, userId: id });
  return res.status(CREATE).json(newPost);
});

router.put('/:id', tokenIsValid, validatePost, async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;
  const updatePost = await blogPostService.updatePost(id, title, content, userId);
  if (updatePost.isError) {
    return res.status(updatePost.status).json({ message: updatePost.message });
  }

  return res.status(OK).json(updatePost);
});

module.exports = router;
