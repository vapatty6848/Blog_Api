const { Router } = require('express');
const { getAllUsers, getUserById, createUser } = require('../middlewares/UserMiddleware');
const { userValidation } = require('../middlewares/validations');
const tokenValidation = require('../middlewares/auth/validateJWT');
const createToken = require('../middlewares/auth/generateJWT');

const UserController = new Router();

UserController.get('/', tokenValidation, getAllUsers);
UserController.get('/:id', tokenValidation, getUserById);
UserController.post('/', userValidation, createUser, createToken);

module.exports = UserController;
