const { Router } = require('express');

const { UserValidation } = require('../middlewares/FieldsValidation');

const TokenValidation = require('../middlewares/TokenValidation');

const UserController = new Router();
const {
  createUser,
  getUsers,
} = require('../services/UserService');

UserController.post('/', UserValidation, createUser);

UserController.get('/', TokenValidation, getUsers);

module.exports = UserController;
