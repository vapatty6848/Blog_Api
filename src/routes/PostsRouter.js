const { Router } = require('express');
const { PostsController } = require('../controllers');
const { validatePostContent, validateToken, validatePostOwnership } = require('../middlewares/validations');

const PostsRouter = new Router();

PostsRouter.post('/', validateToken, validatePostContent, PostsController.createPost);

PostsRouter.get('/search', validateToken, PostsController.searchPost);

PostsRouter.get('/:id', validateToken, PostsController.getPostById);

PostsRouter.get('/', validateToken, PostsController.getAllPosts);

PostsRouter.delete('/:id', validateToken, validatePostOwnership, PostsController.deletePost);

PostsRouter.put('/:id', validateToken, validatePostContent, validatePostOwnership, PostsController.updatePost);

module.exports = PostsRouter;
