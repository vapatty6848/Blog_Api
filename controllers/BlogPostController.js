const { Router } = require('express');
const validateJWT = require('../middlewares/auth/validateJWT');
const { createPost, getPosts, getPostById, updatePost } = require('../middlewares/BlogPostMiddleware');
const { BlogPostValidation, checkPostCreator } = require('../middlewares/validations');

const BlogPostController = new Router();

BlogPostController.get('/:id', validateJWT, getPostById);
BlogPostController.get('/', validateJWT, getPosts);
BlogPostController.post('/', validateJWT, BlogPostValidation, createPost);
BlogPostController.put('/:id', validateJWT, BlogPostValidation, checkPostCreator, updatePost);

module.exports = BlogPostController;
