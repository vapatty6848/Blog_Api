const { Router } = require('express');
const usersController = require('./users/controllers');
const authController = require('./auth/controllers');
const blogPostsController = require('./blogPosts/controllers');

const routes = Router();

routes.use('/user', usersController);
routes.use('/login', authController);
routes.use('/post', blogPostsController);

module.exports = routes;
