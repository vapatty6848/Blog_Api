const { Router } = require('express');
const { getAllUsers, createUser } = require('../middlewares/UserMiddleware');
const { userValidation } = require('../middlewares/validations');
const tokenValidation = require('../middlewares/auth/validateJWT');
const createToken = require('../middlewares/auth/generateJWT');

const UserController = new Router();

UserController.get('/', tokenValidation, getAllUsers);
UserController.post('/', userValidation, createUser, createToken);

module.exports = UserController;
