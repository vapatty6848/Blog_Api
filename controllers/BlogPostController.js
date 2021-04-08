const { Router } = require('express');
// const {  } = require('../middlewares/PostMiddleware');

const BlogPostController = new Router();

BlogPostController.get('/');
BlogPostController.post('/');

module.exports = BlogPostController;
