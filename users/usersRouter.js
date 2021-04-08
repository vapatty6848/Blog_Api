const express = require('express');
const usersController = require('./usersController');
const { validateName, validateEmail, validatePassword } = require('../validations/userValidations');

const usersRouter = express.Router();

usersRouter.post('/', validateName, validateEmail, validatePassword, usersController.createUser);

module.exports = usersRouter;
