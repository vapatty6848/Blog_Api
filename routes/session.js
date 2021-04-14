const { Router } = require('express');

const controller = require('../controllers');
const middleware = require('../middlewares');

const sessionRoute = Router();

sessionRoute.post('/', middleware.validateSession, controller.session);

module.exports = sessionRoute;
