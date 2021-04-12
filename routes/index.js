const { Router } = require('express');

const usersRoutes = require('./usersRoutes');
const loginRoutes = require('./loginRoutes');
const postsRoutes = require('./postsRoutes');

const routes = Router();

routes.use('/login', loginRoutes);
routes.use('/user', usersRoutes);
routes.use('/post', postsRoutes);

module.exports = routes;
