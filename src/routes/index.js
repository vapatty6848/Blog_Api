const { Router } = require('express');

const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const postRoutes = require('./post.routes');

const appRoutes = Router();

appRoutes.use('/user', userRoutes);
appRoutes.use('/login', sessionRoutes);
appRoutes.use('/post', postRoutes);

module.exports = appRoutes;
