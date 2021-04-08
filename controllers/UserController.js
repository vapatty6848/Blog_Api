const { Router } = require('express');
const UserValidation = require('../middlewares/UserValidation');
const VerifyAuthotization = require('../middlewares/VerifyAuthotization');
const { createUser, getUsers, getUserById, removeUser } = require('../services/UserService');

const UserController = Router();

UserController.post('/', UserValidation, createUser);

UserController.get('/', VerifyAuthotization, getUsers);

UserController.get('/:id', VerifyAuthotization, getUserById);

UserController.delete('/me', VerifyAuthotization, removeUser);

module.exports = UserController;
