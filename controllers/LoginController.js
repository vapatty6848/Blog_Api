const { Router } = require('express');
const createToken = require('../middlewares/auth/generateJWT');
const { LoginValidation } = require('../middlewares/validations');

const LoginController = new Router();

// LoginController.get('/', getAllUsers);
LoginController.post('/', LoginValidation, createToken);

module.exports = LoginController;