const { Router } = require('express');

const PostsValidation = require('../middlewares/PostsValidation');

const TokenValidation = require('../middlewares/TokenValidation');

const TokenDecodification = require('../middlewares/TokenDecodification');

const PostsController = new Router();
const {
  createPost,
} = require('../services/PostsService');

PostsController.post('/', TokenValidation, TokenDecodification, PostsValidation, createPost);

module.exports = PostsController;
