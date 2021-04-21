const { Router } = require('express');

const usersRoutes = require('./usersRoutes');
const loginRoutes = require('./loginRoutes');

const routes = Router();

routes.use('/', loginRoutes);
routes.use('/', usersRoutes);

module.exports = routes;
