const { Router } = require('express');

const usersRoutes = require('./usersRoutes');
const loginRoutes = require('./loginRoutes');
const postsRoutes = require('./postsRoutes');

const routes = Router();

routes.use('/', loginRoutes);
routes.use('/', usersRoutes);
routes.use('/', postsRoutes);

module.exports = routes;
