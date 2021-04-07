const { Router } = require('express');
const rescue = require('express-rescue');

const PostService = require('../service/PostService');
const { validateToken } = require('../auth/validateToken');
const { validateFields } = require('../middlewares/postValidation');

const PostController = Router();
const CREATED = 201;
const OK = 200;

PostController.post('/post', validateToken, validateFields, rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const newPost = {
    title,
    content,
    userId: id,
    published: new Date(),
    updated: new Date(),
  };
  await PostService.createPost(newPost);

  return res.status(CREATED).json({ title, content, userId: id });
}));

PostController.get('/post', validateToken, rescue(async (req, res) => {
  const posts = await PostService.findPosts();
  return res.status(OK).json(posts);
}));

module.exports = PostController;
