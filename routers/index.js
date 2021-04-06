const express = require('express');

const router = express.Router();

const userController = require('../controllers/UsersController');

const { validateCreateUser } = require('../services/Validation');

// Rotas de User
router.get('/user', userController.getUserAll);
router.post('/user', validateCreateUser, userController.createUser);

module.exports = router;
