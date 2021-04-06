const { Router } = require('express');
const { UsersController } = require('../controllers');
const { validateLogin } = require('../middlewares/validations');

const LoginRouter = new Router();

LoginRouter.post('/', validateLogin, UsersController.login);

module.exports = LoginRouter;
