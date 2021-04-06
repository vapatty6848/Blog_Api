const { Router } = require('express');
const { getAllUsers, createUser } = require('../middlewares/UserMiddleware');
const { userValidation } = require('../middlewares/validations');

const UserController = new Router();

UserController.get('/', getAllUsers);
UserController.post('/', userValidation, createUser);

module.exports = UserController;
