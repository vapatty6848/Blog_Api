const { Router } = require('express');
const rescue = require('express-rescue');

const PostService = require('../service/PostService');
const { validateToken } = require('../auth/validateToken');
const { validateFields, postIdExist, checkAuthorization } = require('../middlewares/postValidation');

const PostController = Router();
const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;

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

PostController.get('/post/:id', validateToken, postIdExist, rescue(async (req, res) => {
  const { id } = req.params;
  const post = await PostService.findPostById(id);
  return res.status(OK).json(post);
}));

PostController.put('/post/:id', validateToken, validateFields, checkAuthorization, rescue(async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { title, content } = req.body;
  await PostService.editPost(id, userId, title, content);

  return res.status(OK).json({ title, content, userId });
}));

PostController.delete('/post/:id', validateToken, postIdExist, checkAuthorization, rescue(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  await PostService.deletePost(id, userId);

  return res.status(NO_CONTENT).json({});
}));

module.exports = PostController;
