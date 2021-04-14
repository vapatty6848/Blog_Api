const { Router } = require('express');

const validateToken = require('../middlewares/validateToken');
const validatePost = require('../middlewares/validatePost');

const PostController = require('../controllers/PostController');

const userRoutes = Router();

userRoutes.post('/', validatePost, validateToken, PostController.createPost);

module.exports = userRoutes;
