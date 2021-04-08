const express = require('express');

const router = express.Router();

const userController = require('../controllers/UsersController');

const { validateCreateUser, validateLogin, validateToken } = require('../services/Validation');
const { createTok } = require('../middleware/createTok');

// Rotas de User
router.get('/user', validateToken, userController.getUserAll);
router.get('/user/:id', validateToken, userController.getUserId);
router.delete('/user/me', validateToken, userController.deleteUser);
router.post('/user', validateCreateUser, userController.createUser, createTok);

// Rota de Login
router.post('/login', validateLogin, createTok);

module.exports = router;
