const { Router } = require('express');
const { getAllUsers, getUserById, deleteUser, createUser } = require('../middlewares/UserMiddleware');
const { userValidation } = require('../middlewares/validations');
const tokenValidation = require('../middlewares/auth/validateJWT');
const createToken = require('../middlewares/auth/generateJWT');

const UserController = new Router();

UserController.get('/', tokenValidation, getAllUsers);
UserController.get('/:id', tokenValidation, getUserById);
UserController.delete('/me', tokenValidation, deleteUser);
UserController.post('/', userValidation, createUser, createToken);

module.exports = UserController;
