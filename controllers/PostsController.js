const { Router } = require('express');

const PostsValidation = require('../middlewares/PostsValidation');

const TokenValidation = require('../middlewares/TokenValidation');

const TokenDecodification = require('../middlewares/TokenDecodification');

const PostsController = new Router();
const {
  createPost,
  getPosts,
} = require('../services/PostsService');

PostsController.post('/', TokenValidation, TokenDecodification, PostsValidation, createPost);

PostsController.get('/', TokenValidation, TokenDecodification, getPosts);

module.exports = PostsController;
