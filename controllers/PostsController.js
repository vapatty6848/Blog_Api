const { Router } = require('express');

const PostsValidation = require('../middlewares/PostsValidation');

const TokenValidation = require('../middlewares/TokenValidation');

const TokenDecodification = require('../middlewares/TokenDecodification');

const PostsController = new Router();
const {
  createPost,
  getPosts,
  getPostById,
  editPost,
  // getByQuery,
} = require('../services/PostsService');

PostsController.post('/', TokenValidation, TokenDecodification, PostsValidation, createPost);

PostsController.get('/', TokenValidation, TokenDecodification, getPosts);

// PostsController.get('/search', getByQuery);

PostsController.get('/:id', TokenValidation, TokenDecodification, getPostById);

PostsController.put('/:id', TokenValidation, TokenDecodification, PostsValidation, editPost);

module.exports = PostsController;
