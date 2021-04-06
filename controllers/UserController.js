const { Router } = require('express');

const { UserValidation } = require('../middlewares/FieldsValidation');

const TokenValidation = require('../middlewares/TokenValidation');

const TokenDecodification = require('../middlewares/TokenDecodification');

const UserController = new Router();
const {
  createUser,
  getUsers,
  getUserById,
  excludeUser,
} = require('../services/UserService');

UserController.post('/', UserValidation, createUser);

UserController.get('/', TokenValidation, getUsers);

UserController.get('/:id', TokenValidation, getUserById);

UserController.delete('/me', TokenValidation, TokenDecodification, excludeUser);

module.exports = UserController;
