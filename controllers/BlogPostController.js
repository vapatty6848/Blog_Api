const { Router } = require('express');

const BlogPostController = Router();

BlogPostController.post('/');

module.exports = BlogPostController;
