const express = require('express');

const { posts } = require('../controllers');
const middlewares = require('../middlewares');

const postsRouter = express.Router();

postsRouter.post('/', middlewares.validateToken, posts.create);
postsRouter.get('/', middlewares.validateToken, posts.getAll);

module.exports = postsRouter;
