const { Router } = require('express');
const validateJWT = require('../middlewares/auth/validateJWT');
const { createPost, getPosts, getPostById } = require('../middlewares/BlogPostMiddleware');
const { BlogPostValidation } = require('../middlewares/validations');

const BlogPostController = new Router();

BlogPostController.get('/:id', validateJWT, getPostById);
BlogPostController.get('/', validateJWT, getPosts);
BlogPostController.post('/', validateJWT, BlogPostValidation, createPost);

module.exports = BlogPostController;
