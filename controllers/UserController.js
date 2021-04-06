const { Router } = require('express');

const { UserValidation } = require('../middlewares/FieldsValidation');

const UserController = new Router();
const {
  createUser,
} = require('../services/UserService');

UserController.post('/', UserValidation, createUser);

module.exports = UserController;
