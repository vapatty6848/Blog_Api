const { Router } = require('express');

const { UserValidation } = require('../middlewares/FieldsValidation');

const TokenValidation = require('../middlewares/TokenValidation');

const UserController = new Router();
const {
  createUser,
  getUsers,
  getUserById,
} = require('../services/UserService');

UserController.post('/', UserValidation, createUser);

UserController.get('/', TokenValidation, getUsers);

UserController.get('/:id', TokenValidation, getUserById);

module.exports = UserController;
