const { Router } = require('express');

const LoginController = Router();

LoginController.post('/');

module.exports = LoginController;
