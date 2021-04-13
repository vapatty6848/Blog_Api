const { Router } = require('express');

const userRoutes = require('./user.routes');

const appRoutes = Router();

appRoutes.use('/user', userRoutes);

module.exports = appRoutes;
