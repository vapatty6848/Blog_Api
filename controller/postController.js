// const { Router } = require('express');
// const postService = require('../service/postService');

// const controller = Router();

// const SUCCESS = 200;
// const SUCCESS1 = 201;
// const NO_CONTENT = 204;

// controller.put('/:id', async (req, res, next) => {
//   const { authorization: token } = req.headers;
//   const { title, content } = req.body;
//   const { id: postId } = req.params;

//   const result = await postService.updatePostById({ token, postId, title, content });

//   if (result.payload) return next(result);

//   return res.status(SUCCESS).send(result);
// });

// controller.get('/:id', async (req, res, next) => {
//   const { authorization: token } = req.headers;
//   const { id: postId } = req.params;

//   const result = await postService.getPostById({ token, postId });

//   if (result.payload) return next(result);

//   return res.status(SUCCESS).json(...result);
// });

// controller.delete('/:id', async (req, res, next) => {
//   const { authorization: token } = req.headers;
//   const { id: postId } = req.params;

//   const result = await postService.deletePostById({ token, postId });

//   if (result.payload) return next(result);

//   return res.status(NO_CONTENT).send();
// });

// controller.get('/', async (req, res, next) => {
//   const { authorization: token } = req.headers;

//   const result = await postService.getAllPosts({ token });

//   if (result.payload) return next(result);

//   return res.status(SUCCESS).json(result);
// });

// controller.post('/', async (req, res, next) => {
//   const { title, content } = req.body;
//   const { authorization: token } = req.headers;

//   const result = await postService.createPost({ title, content, token });

//   if (result.payload) return next(result);

//   return res.status(SUCCESS1).json(result);
// });

// module.exports = controller;
