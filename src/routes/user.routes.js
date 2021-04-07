const { Router } = require('express');

const UserController = require('../controllers/UserController');

const validateCreateUser = require('../middlewares/validateCreateUser');

const userRoutes = Router();

userRoutes.post('/', validateCreateUser, UserController.createUser);

module.exports = userRoutes;
