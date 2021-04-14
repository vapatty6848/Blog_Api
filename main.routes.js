const express = require('express');

const router = require('./routes');

const routes = express.Router();

routes.use('/user', router.users);

module.exports = routes;
