const express = require('express');

const router = require('./routes');

const routes = express.Router();

routes.use('/user', router.users);
routes.use('/login', router.session);

module.exports = routes;
