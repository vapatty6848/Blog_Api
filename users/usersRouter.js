const express = require('express');
const usersController = require('./usersController');
const { validateName, validateEmail, validatePassword } = require('../validations/userValidations');
const validateToken = require('../token/validateToken');

const usersRouter = express.Router();

usersRouter.post('/', validateName, validateEmail, validatePassword, usersController.createUser);

usersRouter.get('/', validateToken, usersController.getAllUsers);

usersRouter.get('/:id', validateToken, usersController.getById);

module.exports = usersRouter;
