const { Router } = require('express');
const { UsersController } = require('../controllers');

const LoginRouter = new Router();

LoginRouter.post('/', UsersController.login);

module.exports = LoginRouter;
