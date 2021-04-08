const { Router } = require('express');

const BlogPostController = new Router();

const { BlogPostValidation } = require('../middlewares/validations');
const VerifyAuthotization = require('../middlewares/VerifyAuthotization');
const { createPost, getPosts, getByQuery, getPostById, editPost, removePost } = require('../services/BlogPostService');

BlogPostController.post('/', VerifyAuthotization, BlogPostValidation, createPost);

BlogPostController.get('/', VerifyAuthotization, getPosts);

BlogPostController.get('/search', VerifyAuthotization, getByQuery);

BlogPostController.get('/:id', VerifyAuthotization, getPostById);

BlogPostController.put('/:id', VerifyAuthotization, BlogPostValidation, editPost);

BlogPostController.delete('/:id', VerifyAuthotization, removePost);

module.exports = BlogPostController;
