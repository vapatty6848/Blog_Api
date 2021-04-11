const { Router } = require('express');
const controllers = require('./controller');

const Routes = Router();

Routes.use('/user', controllers.userController);
Routes.use('/login', controllers.loginController);
Routes.use('/post', controllers.postController);

module.exports = Routes;
