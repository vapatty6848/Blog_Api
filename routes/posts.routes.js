const express = require('express');

const { posts } = require('../controllers');
const middlewares = require('../middlewares');

const postsRouter = express.Router();

postsRouter.post('/', middlewares.validateToken, posts.create);
postsRouter.put('/:id', middlewares.validateToken, posts.updateOne);
postsRouter.get('/search', middlewares.validateToken, posts.getPosts);
postsRouter.get('/:id', middlewares.validateToken, posts.getOne);
postsRouter.get('/', middlewares.validateToken, posts.getPosts);
postsRouter.delete('/:id', middlewares.validateToken, posts.removeOne);

module.exports = postsRouter;
