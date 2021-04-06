const { Router } = require('express');
const { PostsController } = require('../controllers');

const PostsRouter = new Router();

PostsRouter.post('/', PostsController.createPost);

PostsRouter.put('/search?q=:searchTerm', PostsController.searchPost);

PostsRouter.get('/:id', PostsController.getPostById);

PostsRouter.get('/', PostsController.getAllPosts);

PostsRouter.put('/:id', PostsController.updatePost);

module.exports = PostsRouter;
