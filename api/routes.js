const { Router } = require('express');
const usersController = require('./users');

const routes = Router();

routes.use('/user', usersController);

module.exports = routes;
