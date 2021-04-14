const { Router } = require('express');

const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const UserController = require('../controllers/UserController');

const userRoutes = Router();

userRoutes.post('/', validateUser, UserController.createUser);
userRoutes.get('/', validateToken, UserController.getAllUsers);

module.exports = userRoutes;
