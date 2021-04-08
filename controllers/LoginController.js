const { Router } = require('express');
const { LoginValidation } = require('../middlewares/validations');

const LoginController = new Router();
const {
  Login,
} = require('../services/LoginService');

LoginController.post('/', LoginValidation, Login);

module.exports = LoginController;
