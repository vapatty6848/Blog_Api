const { Router } = require('express');

const validateToken = require('../middlewares/validateToken');
const validatePost = require('../middlewares/validatePost');
const validatePostFromUser = require('../middlewares/validatePostFromUser');

const PostController = require('../controllers/PostController');

const userRoutes = Router();

userRoutes.post('/', validatePost, validateToken, PostController.createPost);
userRoutes.get('/', validateToken, PostController.getAllPosts);
userRoutes.get('/:id', validateToken, PostController.getPostById);
userRoutes.delete('/:id', validateToken, validatePostFromUser, PostController.deletePost);

module.exports = userRoutes;
