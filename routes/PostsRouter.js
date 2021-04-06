const { Router } = require('express');
const PostsController = require('../controllers');

const PostsRouter = new Router();

PostsRouter.post('/', PostsRouter.createPost);

PostsRouter.put('/:search?q=:searchTerm', PostsRouter.searchPost);

PostsRouter.get('/:id', PostsRouter.getPostById);

PostsRouter.get('/', PostsRouter.getAllPosts);

PostsRouter.put('/:id', PostsRouter.updatePost);

module.exports = PostsRouter;
