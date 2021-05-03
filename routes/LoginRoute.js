const { Router } = require('express');
const LoginController = require('../controller/login/LoginController');
const LoginValidate = require('../middlewares/LoginValidate');

const LoginRouter = Router();

LoginRouter.post('/', LoginValidate, LoginController);

module.exports = LoginRouter;
