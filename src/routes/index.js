const { Router } = require('express');

const userRoutes = require('./user.routes');
const loginRoutes = require('./login.routes');

const appRoutes = Router();

appRoutes.use('/user', userRoutes);
appRoutes.use('/login', loginRoutes);

module.exports = appRoutes;
