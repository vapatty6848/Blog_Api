const { Router } = require('express');
const { PostsController } = require('../controllers');
const { validatePostCreation, validateToken } = require('../middlewares/validations');

const PostsRouter = new Router();

PostsRouter.post('/', validateToken, validatePostCreation, PostsController.createPost);

PostsRouter.put('/search?q=:searchTerm', PostsController.searchPost);

PostsRouter.get('/:id', validateToken, PostsController.getPostById);

PostsRouter.get('/', validateToken, PostsController.getAllPosts);

PostsRouter.put('/:id', PostsController.updatePost);

module.exports = PostsRouter;
