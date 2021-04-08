const express = require('express');

const router = express.Router();

const userController = require('../controllers/UsersController');
const postController = require('../controllers/PostsController');

const { validateCreateUser, validateLogin, validateToken, validatePost } = require('../services/Validation');
const { generateToken } = require('../middleware/generateToken');

// Rotas de User
router.get('/user', validateToken, userController.getUserAll);
router.get('/user/:id', validateToken, userController.getUserId);
router.delete('/user/me', validateToken, userController.deleteUser);
router.post('/user', validateCreateUser, userController.createUser, generateToken);

// Rota de Login
router.post('/login', validateLogin, generateToken);

// Rotas de BlogPost
router.post('/post', validateToken, validatePost, postController.createPost);

module.exports = router;
