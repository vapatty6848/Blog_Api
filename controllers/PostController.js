const { Router } = require('express');
// const {  } = require('../middlewares/PostMiddleware');

const PostController = new Router();

PostController.get('/');
PostController.post('/');

module.exports = PostController;
