const { Router } = require('express');

const validateUser = require('../middlewares/validateUser');

const UserController = require('../controllers/UserController');

const userRoutes = Router();

userRoutes.post('/', validateUser, UserController.createUser);

module.exports = userRoutes;
