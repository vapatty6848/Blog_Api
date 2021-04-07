const express = require('express');

const router = express.Router();

const userController = require('../controllers/UsersController');
const loginController = require('../controllers/LoginController');

const { validateCreateUser, validateLogin, validateToken } = require('../services/Validation');

// Rotas de User
router.get('/user', validateToken, userController.getUserAll);
router.post('/user', validateCreateUser, userController.createUser);

// Rota de Login
router.post('/login', validateLogin, loginController.login);

module.exports = router;
