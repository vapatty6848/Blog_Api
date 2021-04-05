const { Router } = require('express');

const FieldsValidation = require('../middlewares/FieldsValidation');

const UserController = new Router();
const {
  createUser,
} = require('../services/UserService');

UserController.post('/', FieldsValidation, createUser);

module.exports = UserController;
