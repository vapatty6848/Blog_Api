const express = require('express');
// const path = require('path');

const { handleError } = require('./middlewares');

const router = require('./routes');

const routes = express.Router();

routes.use('/login', router.session);
routes.use('/user', router.users);

// routes.use('/images', express.static(path.join(__dirname, './images')));
routes.use(handleError);

routes.use(router.notFound);

module.exports = routes;
