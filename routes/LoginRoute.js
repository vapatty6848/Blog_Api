const { Router } = require('express');
const LoginController = require('../controller/LoginController');
const LoginValidate = require('../middlewares/LoginValidate');

const LoginRouter = Router();

LoginRouter.post('/', LoginValidate, LoginController);

module.exports = LoginRouter;
