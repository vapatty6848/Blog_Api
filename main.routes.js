const express = require('express');

const router = require('./routes');

const routes = express.Router();

routes.use('/login', router.session);
routes.use('/user', router.users);
routes.use('/post', router.posts);

module.exports = routes;
