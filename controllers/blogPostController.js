const { Router } = require('express');
const blogPostService = require('../services/blogPostService');
const tokenIsValid = require('../middlewares/tokenValidation');
const validatePost = require('../middlewares/blogpostValidation');

const router = Router();

const CREATE = 201;
// const OK = 200;
// const NO_CONTENT = 204;

router.post('/', tokenIsValid, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const newPost = await blogPostService.createPost(title, content, id);
  return res.status(CREATE).json(newPost);
});

module.exports = router;
