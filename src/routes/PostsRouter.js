const { Router } = require('express');
const { PostsController } = require('../controllers');
const { validatePostCreation, validateToken } = require('../middlewares/validations');

const PostsRouter = new Router();

PostsRouter.post('/', validateToken, validatePostCreation, PostsController.createPost);

PostsRouter.get('/search', validateToken, PostsController.searchPost);

PostsRouter.get('/:id', validateToken, PostsController.getPostById);

PostsRouter.get('/', validateToken, PostsController.getAllPosts);

PostsRouter.put('/:id', validateToken, validatePostCreation, PostsController.updatePost);

module.exports = PostsRouter;
